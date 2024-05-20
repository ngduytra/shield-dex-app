"use client";
import { PoolData } from "@/constants";
import isEqual from "react-fast-compare";
import { decimalize, undecimalize } from "@/helpers/decimals";
import {
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import BN from "bn.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";
import {
  useGetTokenAccountBalance,
  useTokenAccountBalance,
} from "./useAccountData";
import { IDL, ShieldDexPg, programId } from "@/program";
import { Address, IdlTypes, Program, utils } from "@coral-xyz/anchor";
import { useSwapGlob } from "@/components/swap";
import { useAnchorProvider } from "@/solana/solana-provider";
import { splTokenProgram } from "@coral-xyz/spl-token";
import {
  useAllTokenAccounts,
  useTokenAccountByMintAddress,
} from "@/providers/tokenAccount.provider";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WRAPPED_SOL_MINT, toPublicKey } from "@metaplex-foundation/js";
import { useMintByAddress } from "@/providers/mint.provider";
import { useShieldDexUiProgram } from "./useShieldDexProgram";
import { useMints, useSpl } from "./splHook";

export enum Platform {
  ShieldSwap = "ShieldSwap",
  Jup = "Jupiter",
}

export const GENERAL_DECIMALS = 9;
export const LPT_DECIMALS = 9;
export const GENERAL_NORMALIZED_NUMBER = 10 ** 9;

export type PoolPairLpData = {
  balanceIn: BN;
  balanceOut: BN;
  weightIn: number;
  decimalIn: number;
  swapFee: BN;
};

export type PoolActionState = IdlTypes<ShieldDexPg>["PoolState"];
export declare const MintActionStates: Record<string, PoolActionState>;

export type RouteInfo = {
  platformConfig: PublicKey;
  pool: string;
  bidMint: string;
  bidAmount: BN;
  askMint: string;
  askAmount: BN;
  priceImpactPct: number;
  taxman: PublicKey;
};

export type Route = {
  pool: Address;
  bidMint: string;
  askMint: string;
};

export type ShieldSwapRoute = {
  route: RouteInfo[];
  bidAmount: string;
  askAmount: string;
  priceImpactPct: number;
};

export type ShieldMintRoutes = {
  [mintAddress: string]: { [mintAddress: string]: Address[] };
};

/**
 * Create PDA account
 * @param mint mint account
 * @param owner your public key
 * @returns Init PDA account function
 */
export const useInitPDAAccount = () => {
  const { publicKey } = useWallet();
  const initPDAAccount = useCallback(
    async (mint: PublicKey, owner: PublicKey) => {
      if (!publicKey) return;
      const associatedTokenAccount = await utils.token.associatedAddress({
        mint,
        owner,
      });
      const ix = new TransactionInstruction({
        keys: [
          {
            pubkey: publicKey,
            isSigner: true,
            isWritable: true,
          },
          {
            pubkey: associatedTokenAccount,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: owner,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: mint,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: utils.token.TOKEN_PROGRAM_ID,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false,
          },
        ],
        programId: utils.token.ASSOCIATED_PROGRAM_ID,
        data: Buffer.from([]),
      });
      const tx = new Transaction().add(ix);
      return tx;
    },
    [publicKey]
  );

  return initPDAAccount;
};

/**
 * Wrap and Unwrap sol
 * @returns Wrap and Unwrap sol functions
 */
export const useWrapSol = () => {
  const spl = useSpl();
  const accounts = useAllTokenAccounts();
  const onInitAccount = useInitPDAAccount();
  const { publicKey } = useWallet();

  const { amount: wrapSolAmount } = useTokenAccountByMintAddress(
    WRAPPED_SOL_MINT.toBase58()
  ) || { amount: new BN(0) };

  const createTxUnwrapSol = useCallback(
    async (owner: PublicKey) => {
      const ata = utils.token.associatedAddress({
        mint: WRAPPED_SOL_MINT,
        owner,
      });
      const tx = await spl.methods
        .closeAccount()
        .accounts({
          account: ata,
          destination: owner,
          owner: owner,
        })
        .transaction();
      return tx;
    },
    [spl.methods]
  );

  const createWrapSol = useCallback(
    async (amount: BN) => {
      if (!publicKey) return;
      const tx = new Transaction();
      const ataSol = utils.token.associatedAddress({
        mint: WRAPPED_SOL_MINT,
        owner: publicKey,
      });
      if (!accounts[ataSol.toBase58()]) {
        const txInitAcc = await onInitAccount(WRAPPED_SOL_MINT, publicKey);
        if (txInitAcc) tx.add(txInitAcc);
      }
      const txSolTransfer = await SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: ataSol,
        lamports: BigInt(amount.toString()),
      });
      const txSync = await spl.methods
        .syncNative()
        .accounts({ account: ataSol })
        .instruction();
      tx.add(txSolTransfer, txSync);

      return tx;
    },
    [accounts, onInitAccount, publicKey, spl.methods]
  );

  const createWrapSolTxIfNeed = useCallback(
    async (mint: PublicKey, amount: BN) => {
      if (mint.equals(WRAPPED_SOL_MINT)) {
        const txWrapSol = await createWrapSol(amount.sub(wrapSolAmount));
        return txWrapSol;
      }
    },
    [createWrapSol, wrapSolAmount]
  );

  return { createTxUnwrapSol, createWrapSol, createWrapSolTxIfNeed };
};

/**
 * Oracles functions
 * @returns Oracles functions
 */
export const useOracles = () => {
  const { getTokenBalanceAddress } = useGetTokenAccountBalance();
  const calcNormalizedWeight = useCallback((weights: BN[], weightToken: BN) => {
    const numWeightsIn = weights.map((value) =>
      Number(undecimalize(value, GENERAL_DECIMALS))
    );
    const numWeightToken = Number(undecimalize(weightToken, GENERAL_DECIMALS));
    const weightSum = numWeightsIn.reduce((pre, curr) => pre + curr, 0);
    return numWeightToken / weightSum;
  }, []);

  const getMintInfo = useCallback(
    async (
      poolData: PoolData,
      inputMint: PublicKey,
      poolPublicKey: PublicKey
    ) => {
      const mintIdx = [poolData.mintA, poolData.mintB].findIndex(
        (mint: PublicKey) => mint.equals(inputMint)
      );
      // Just to make sure inputMint exist in pool
      if (mintIdx === -1) throw new Error("Can not find mint in pool");

      const inputMintReserve = await getTokenBalanceAddress(inputMint);
      const [escrowAB] = PublicKey.findProgramAddressSync(
        [Buffer.from("escrow"), poolPublicKey.toBuffer()],
        programId
      );

      return {
        reserve: decimalize(
          (inputMintReserve.value.uiAmount || 0).toString(),
          inputMintReserve.value.decimals
        ),
        normalizedWeight: 50,
        treasury: utils.token.associatedAddress({
          owner: escrowAB,
          mint: inputMint,
        }),
      };
    },
    [getTokenBalanceAddress]
  );

  const calcLptOut = useCallback(
    (
      tokenAmountIns: BN[],
      balanceIns: BN[],
      weightIns: BN[],
      totalSupply: BN,
      decimalIns: number[],
      swapFee: BN
    ) => {
      const fee = Number(undecimalize(swapFee, GENERAL_DECIMALS));
      const numTotalSupply = Number(undecimalize(totalSupply, LPT_DECIMALS));
      const numBalanceIns = balanceIns.map((value, idx) =>
        Number(undecimalize(value, decimalIns[idx]))
      );
      const numAmountIns = tokenAmountIns.map((value, idx) =>
        Number(undecimalize(value, decimalIns[idx]))
      );
      const balanceRatiosWithFee = new Array(tokenAmountIns.length);

      let invariantRatioWithFees = 0;
      for (let i = 0; i < tokenAmountIns.length; i++) {
        const nomalizedWeight = calcNormalizedWeight(weightIns, weightIns[i]);

        balanceRatiosWithFee[i] =
          (numBalanceIns[i] + numAmountIns[i]) / numBalanceIns[i];

        invariantRatioWithFees += balanceRatiosWithFee[i] * nomalizedWeight;
      }

      let invariantRatio = 1;

      for (let i = 0; i < tokenAmountIns.length; i++) {
        const nomalizedWeight = calcNormalizedWeight(weightIns, weightIns[i]);
        let amountInWithoutFee = numAmountIns[i];
        if (balanceRatiosWithFee[i] > invariantRatioWithFees) {
          const nonTaxableAmount =
            numBalanceIns[i] * (invariantRatioWithFees - 1);
          const taxableAmount = numAmountIns[i] - nonTaxableAmount;
          amountInWithoutFee = nonTaxableAmount + taxableAmount * (1 - fee);
        }
        const balanceRatio =
          (numBalanceIns[i] + amountInWithoutFee) / numBalanceIns[i];
        invariantRatio = invariantRatio * balanceRatio ** nomalizedWeight;
      }
      if (invariantRatio > 1) return numTotalSupply * (invariantRatio - 1);
      return 0;
    },
    [calcNormalizedWeight]
  );

  const spotPriceAfterSwapTokenInForExactLPTOut = useCallback(
    (poolPairData: PoolPairLpData) => {
      const { balanceOut, balanceIn, swapFee, decimalIn } = poolPairData;
      const Bo = Number(undecimalize(balanceOut, LPT_DECIMALS));
      const Ao = Number(undecimalize(new BN(0), LPT_DECIMALS));
      const wi = poolPairData.weightIn;
      const Bi = Number(undecimalize(balanceIn, decimalIn));
      const f = Number(undecimalize(swapFee, GENERAL_DECIMALS));

      return (
        (Math.pow((Ao + Bo) / Bo, 1 / wi) * Bi) /
        ((Ao + Bo) * (1 + f * (-1 + wi)) * wi)
      );
    },
    []
  );

  const calcLpForTokensZeroPriceImpact = useCallback(
    (
      tokenAmountIns: BN[],
      balanceIns: BN[],
      weightIns: BN[],
      totalSupply: BN,
      decimalIns: number[]
    ) => {
      const numTokenAmountIns = tokenAmountIns.map((value, idx) =>
        Number(undecimalize(value, decimalIns[idx]))
      );
      const amountLpOut = numTokenAmountIns.reduce(
        (totalBptOut, amountIn, i) => {
          const normalizedWeight = calcNormalizedWeight(
            weightIns,
            weightIns[i]
          );
          const poolPairData: PoolPairLpData = {
            balanceIn: balanceIns[i],
            balanceOut: totalSupply,
            weightIn: normalizedWeight,
            decimalIn: decimalIns[i],
            swapFee: new BN(0),
          };
          const LpPrice = spotPriceAfterSwapTokenInForExactLPTOut(poolPairData);
          const LpOut = amountIn / LpPrice;
          return totalBptOut + LpOut;
        },
        0
      );

      return amountLpOut;
    },
    [calcNormalizedWeight, spotPriceAfterSwapTokenInForExactLPTOut]
  );

  const calcOutGivenInSwap = useCallback(
    (
      amountIn: BN,
      askReserve: BN,
      bidReserve: BN,
      askWeight: number,
      bidWeight: number,
      swapFee: BN
    ): BN => {
      const numSwapFee = Number(swapFee) / GENERAL_NORMALIZED_NUMBER;
      const numAmountIn = (1 - numSwapFee) * Number(amountIn);
      const numBalanceOut = Number(askReserve);
      const numBalanceIn = Number(bidReserve);
      const balanceRatio = numBalanceIn / (numAmountIn + numBalanceIn);
      const weightRatio = bidWeight / askWeight;
      const askAmount = (1 - balanceRatio ** weightRatio) * numBalanceOut;
      return decimalize(askAmount.toString(), 0);
    },
    []
  );

  function calcSpotPriceExactInSwap(params: {
    amount: BN;
    balanceIn: BN;
    balanceOut: BN;
    weightIn: number;
    weightOut: number;
    decimalIn: number;
    decimalOut: number;
    swapFee: BN;
  }) {
    const {
      balanceIn,
      decimalIn,
      balanceOut,
      decimalOut,
      weightIn,
      weightOut,
      swapFee,
      amount,
    } = params;
    const Bi = Number(undecimalize(balanceIn, decimalIn));
    const Bo = Number(undecimalize(balanceOut, decimalOut));
    const wi = weightIn;
    const wo = weightOut;
    const Ai = Number(undecimalize(amount, decimalIn));
    const f = Number(undecimalize(swapFee, GENERAL_DECIMALS));
    return -(
      (Bi * wo) /
      (Bo * (-1 + f) * (Bi / (Ai + Bi - Ai * f)) ** ((wi + wo) / wo) * wi)
    );
  }

  const calcPriceImpactSwap = useCallback(
    (
      bidAmount: BN,
      params: {
        balanceIn: BN;
        balanceOut: BN;
        weightIn: number;
        weightOut: number;
        decimalIn: number;
        decimalOut: number;
        swapFee: BN;
      }
    ) => {
      const currentSpotPrice = calcSpotPriceExactInSwap({
        ...params,
        amount: new BN(0),
      });
      const spotPriceAfterSwap = calcSpotPriceExactInSwap({
        ...params,
        amount: bidAmount,
      });

      if (spotPriceAfterSwap < currentSpotPrice) return 0;
      const impactPrice = 1 - currentSpotPrice / spotPriceAfterSwap;
      return impactPrice;
    },
    []
  );
  return {
    calcNormalizedWeight,
    getMintInfo,
    calcLptOut,
    calcLpForTokensZeroPriceImpact,
    calcOutGivenInSwap,
    calcPriceImpactSwap,
  };
};

/**  Generate available routes in sen swap
 *   @returns All routes
 */
export const useAllRoutes = () => {
  const {
    fetchPool: { data: pools },
  } = useShieldDexUiProgram();

  console.log("thong tin pools: ", pools);
  const { getTokenBalanceAddress } = useGetTokenAccountBalance();
  // Get pools tvl > 1000$
  const validPools = useMemo(async () => {
    const result: Record<string, PoolData> = {};
    if (!pools) return result;
    for (const pool of pools) {
      const [escrow] = PublicKey.findProgramAddressSync(
        [Buffer.from("escrow"), pool.publicKey.toBuffer()],
        programId
      );
      const treasuryA = utils.token.associatedAddress({
        mint: toPublicKey(pool.account.mintA),
        owner: escrow,
      });
      const treasuryB = utils.token.associatedAddress({
        mint: toPublicKey(pool.account.mintA),
        owner: escrow,
      });

      const balanceA = await getTokenBalanceAddress(treasuryA);
      const balanceB = await getTokenBalanceAddress(treasuryB);

      if (!balanceA.value.amount || !balanceB.value.amount) continue;
      result[pool.publicKey.toBase58()] = pool.account;
    }
    return result;
  }, [getTokenBalanceAddress, pools]);

  const allRoutes = useMemo(async () => {
    const mintRoutes: ShieldMintRoutes = {};
    const pools = await validPools;
    for (const address in pools) {
      const { mintA, mintB, state } = pools[address];
      const mintAddresses = [mintA.toBase58(), mintB.toBase58()];
      if (!isEqual(state, MintActionStates.Active)) continue;
      for (let i = 0; i < mintAddresses.length; i++) {
        for (let j = 0; j < mintAddresses.length; j++) {
          const bidMint = mintAddresses[i];
          const askMint = mintAddresses[j];

          if (bidMint === askMint) continue;

          if (!mintRoutes[bidMint]) mintRoutes[bidMint] = {};
          if (!mintRoutes[bidMint][askMint]) mintRoutes[bidMint][askMint] = [];
          mintRoutes[bidMint][askMint].push(address);
        }
      }
    }
    return mintRoutes;
  }, [validPools]);

  return allRoutes;
};

/** Get valid routes with bidAddress and askAddress
 *  @returns valid routes
 */

export const useRoutes = () => {
  const [availRoutes, setAvailRoutes] = useState<Route[][]>([]);
  const allRoutes = useAllRoutes();
  const [swapGlob] = useSwapGlob();

  const isValidRoute = (route: Route[]) => {
    const pools = new Set();
    const mintPairs = new Set();

    for (const { pool, askMint, bidMint } of route) {
      // Check duplicate pools
      if (pools.has(pool)) return false;
      pools.add(pool);

      const mintPair = bidMint + "-" + askMint;
      const reverseMintPair = askMint + "-" + bidMint;
      // Check duplicate bidMint && askMint
      if (mintPairs.has(reverseMintPair)) return false;
      mintPairs.add(mintPair);
    }
    return true;
  };

  const getAvailRoutes = useCallback(
    async (bidMint: string, askMint: string, hop = 1) => {
      if (hop > 3) return [];
      const allWaitedRoutes = await allRoutes;

      const routesFromBid = allWaitedRoutes[bidMint];
      if (!routesFromBid) return [];

      const pools = routesFromBid[askMint] || [];
      const routes: Array<Route[]> = pools.map((pool) => {
        return [{ pool, bidMint, askMint }];
      });

      for (const nextMint in routesFromBid) {
        const nextPools = routesFromBid[nextMint];
        const nextHop = hop + 1;
        const nextRoutes = await getAvailRoutes(nextMint, askMint, nextHop);

        nextRoutes.forEach((route) => {
          nextPools.forEach((pool) => {
            const newRoute = [{ pool, bidMint, askMint: nextMint }, ...route];
            if (isValidRoute(newRoute)) routes.push(newRoute);
          });
        });
      }
      return routes;
    },

    [allRoutes]
  );

  useDebounce(
    async () => {
      const availRoutes = await getAvailRoutes(
        swapGlob.accounts.bidMint,
        swapGlob.accounts.askMint
      );
      setAvailRoutes(availRoutes);
    },
    300,
    [
      getAvailRoutes,
      setAvailRoutes,
      swapGlob.accounts.bidMint,
      swapGlob.accounts.askMint,
    ]
  );

  return { availRoutes: availRoutes || [] };
};

/**
 * Get the best route with bidAddress and askAddress
 * @returns The best route
 */
export const useBestShieldRoutes = () => {
  const [routesInfo, setRoutesInfo] = useState<RouteInfo[][]>([]);
  const { getTokenBalanceAddress } = useGetTokenAccountBalance();
  const { getMintInfo, calcOutGivenInSwap, calcPriceImpactSwap } = useOracles();
  const { availRoutes } = useRoutes();
  const {
    fetchPool: { data: pools },
    fetchPlatformConfig,
  } = useShieldDexUiProgram();
  const [swapGlob, setSwapGlob] = useSwapGlob();
  //   const bidMintAddress = useSwapStore(({ bidMintAddress }) => bidMintAddress);
  //   const bidAmount = useSwapStore(({ bidAmount }) => bidAmount);

  const { decimals: bidDecimals = 0 } =
    useMintByAddress(swapGlob.accounts.bidMint) || {};

  const allMintAddress = useMemo(() => {
    const mints: string[] = [];
    availRoutes.forEach((routes) =>
      routes.forEach(({ askMint, bidMint }) => {
        mints.push(bidMint);
        mints.push(askMint);
      })
    );
    return mints;
  }, [availRoutes]);
  const mintInfo = useMints(allMintAddress);
  const decimals = useMemo(() => {
    const mintDecimals: { [mintAddress: string]: number } = {};
    allMintAddress.forEach((mintAddress, i) => {
      mintDecimals[mintAddress] = mintInfo[i]?.decimals || 0;
    });
    return mintDecimals;
  }, [allMintAddress, mintInfo]);

  // Calculate token out per route
  const fetchRoutesInfo = useCallback(async () => {
    if (!Number(swapGlob.params.bidAmount)) return [];
    const senSwapInfoRoutes: Array<RouteInfo>[] = [];

    for (const routes of availRoutes) {
      const route: RouteInfo[] = [];
      const bidAmountBN = await decimalize(
        swapGlob.params.bidAmount.toString(),
        bidDecimals
      );

      for (const { askMint, bidMint, pool } of routes) {
        const poolData = pools?.find(
          (p) => p.publicKey.toBase58() === pool.toString()
        );
        if (!poolData) throw new Error("Pool not found: " + pool.toString());

        const [escrow] = PublicKey.findProgramAddressSync(
          [Buffer.from("escrow"), poolData.publicKey.toBuffer()],
          programId
        );
        const treasuryA = utils.token.associatedAddress({
          mint: toPublicKey(bidMint),
          owner: escrow,
        });
        const treasuryB = utils.token.associatedAddress({
          mint: toPublicKey(askMint),
          owner: escrow,
        });
        const bidBalance = await getTokenBalanceAddress(treasuryA);
        const askBalance = await getTokenBalanceAddress(treasuryB);

        // const bidMintInfo = getMintInfo(poolData, new PublicKey(bidMint));
        // const askMintInfo = getMintInfo(poolData, new PublicKey(askMint));
        const platformConfig = fetchPlatformConfig.data?.find(
          (p) => p.publicKey.toBase58() === poolData.account.tax.toBase58()
        );

        const tokenOutAmount = calcOutGivenInSwap(
          bidAmountBN,
          decimalize(
            (askBalance.value.uiAmount || 0).toString(),
            decimals[askMint]
          ),
          decimalize(
            (bidBalance.value.uiAmount || 0).toString(),
            decimals[bidMint]
          ),
          50,
          50,
          poolData.account.lpFee.add(platformConfig?.account.tax || new BN(0))
        );

        const dataForSlippage = {
          balanceIn: decimalize(
            (bidBalance.value.uiAmount || 0).toString(),
            decimals[bidMint]
          ),
          balanceOut: decimalize(
            (askBalance.value.uiAmount || 0).toString(),
            decimals[askMint]
          ),
          weightIn: 50,
          weightOut: 50,
          decimalIn: decimals[bidMint],
          decimalOut: decimals[askMint],
          swapFee: poolData.account.lpFee.add(
            platformConfig?.account.tax || new BN(0)
          ),
        };
        let priceImpact = calcPriceImpactSwap(bidAmountBN, dataForSlippage);
        if (priceImpact < 0) priceImpact = 0;
        route.push({
          platformConfig: platformConfig?.publicKey || new PublicKey(""),
          pool: pool.toString(),
          bidMint,
          askMint,
          bidAmount: bidAmountBN,
          askAmount: tokenOutAmount,
          priceImpactPct: priceImpact,
          taxman: new PublicKey(swapGlob.accounts.taxman),
        });
      }
      senSwapInfoRoutes.push(route);
    }
    return senSwapInfoRoutes;
  }, [
    availRoutes,
    bidDecimals,
    calcOutGivenInSwap,
    calcPriceImpactSwap,
    decimals,
    fetchPlatformConfig.data,
    getTokenBalanceAddress,
    pools,
    swapGlob.accounts.taxman,
    swapGlob.params.bidAmount,
  ]);

  const bestShieldSwapRoute = useMemo(() => {
    if (!routesInfo || !pools) return;
    const sortedRoute = routesInfo.sort((routeA, routeB) => {
      const askAmountA = routeA[routeA.length - 1].askAmount;
      const askAmountB: BN = routeB[routeB.length - 1].askAmount;
      return askAmountB.gt(askAmountA) ? 1 : -1;
    });
    const [bestRoute] = sortedRoute;
    if (!bestRoute?.length)
      return {
        route: [],
        bidAmount: swapGlob.params.bidAmount.toString(),
        askAmount: "0",
        priceImpactPct: 0,
      };

    const askAmount = bestRoute[bestRoute.length - 1].askAmount.toString();

    const bestRouteInfo = bestRoute.map((value, idx) => {
      const poolData = pools.find(
        (pool) => pool.publicKey.toBase58() === value.pool
      );
      return { ...bestRoute[idx], poolData };
    });
    const p = bestRouteInfo.reduce(
      (acc, elmInfo) => acc * (1 - elmInfo.priceImpactPct),
      1
    );
    const newPriceImpact = 1 - p;
    return {
      route: bestRoute,
      bidAmount: swapGlob.params.bidAmount.toString(),
      askAmount: askAmount,
      priceImpactPct: newPriceImpact,
    };
  }, [swapGlob.params.bidAmount, pools, routesInfo]);

  useDebounce(
    async () => {
      const routesInfo = await fetchRoutesInfo();
      setRoutesInfo(routesInfo);
    },
    300,
    [fetchRoutesInfo, setRoutesInfo]
  );

  return { bestShieldSwapRoute };
};

export const useInitMultiTokenAccount = () => {
  const initPDAAccount = useInitPDAAccount();
  const { connection } = useConnection();
  const initTxCreateMultiTokenAccount = useCallback(
    async (mints: Address[], owner: PublicKey) => {
      const transactions: Transaction[] = [];
      const tokenAccounts = [];
      for (const mint of mints) {
        const mintPublicKey = toPublicKey(mint);
        const associatedTokenAccount = await utils.token.associatedAddress({
          mint: mintPublicKey,
          owner,
        });
        tokenAccounts.push(associatedTokenAccount);
      }
      const accounts = await connection.getMultipleAccountsInfo(tokenAccounts);
      await Promise.all(
        accounts.map(async (value, index) => {
          if (value !== null) return;
          const tx = await initPDAAccount(toPublicKey(mints[index]), owner);
          if (tx) transactions.push(tx);
        })
      );

      return transactions;
    },
    [connection, initPDAAccount]
  );

  return initTxCreateMultiTokenAccount;
};

/**
 * Swap on senswap
 * @returns swap function
 */
export const useShieldSwap = () => {
  const provider = useAnchorProvider();
  const [swapGlob] = useSwapGlob();

  //   const bidMintAddress = useSwapStore(({ bidMintAddress }) => bidMintAddress);
  //   const askMintAddress = useSwapStore(({ askMintAddress }) => askMintAddress);
  const askMintInfo = useTokenAccountBalance(swapGlob.accounts.askMint) || {};
  const bidMintInfo = useTokenAccountBalance(swapGlob.accounts.bidMint) || {};
  const { createWrapSolTxIfNeed, createTxUnwrapSol } = useWrapSol();
  const program = new Program(IDL, programId, provider);
  const { route: routeProg } = useShieldDexUiProgram();
  //   const senswap = useSenswap();
  const { publicKey } = useWallet();

  const initTxCreateMultiTokenAccount = useInitMultiTokenAccount();
  const initTokenAccountTxs = useCallback(async () => {
    if (!swapGlob.bestRoute || !publicKey) return [];
    const transactions = await initTxCreateMultiTokenAccount(
      swapGlob.bestRoute.route.map((route) => route.askMint),
      publicKey
    );
    return transactions;
  }, [swapGlob.bestRoute, initTxCreateMultiTokenAccount, publicKey]);

  const swap = useCallback(async () => {
    if (!swapGlob.bestRoute || !program.provider.sendAll) return "";
    const { askAmount, route } = swapGlob.bestRoute;

    const bidAmountBN = decimalize(
      swapGlob.params.bidAmount.toString(),
      bidMintInfo.data?.value.decimals || 0
    );
    const rawAskAmount = undecimalize(
      new BN(askAmount),
      askMintInfo.data?.value.decimals || 0
    );
    const limit = Number(rawAskAmount) * (1 - swapGlob.params.limit);
    const limitBN = decimalize(
      limit.toString(),
      askMintInfo.data?.value.decimals || 0
    );
    const transactions = await initTokenAccountTxs();
    const wrapSolTx = await createWrapSolTxIfNeed(
      new PublicKey(swapGlob.accounts.bidMint),
      bidAmountBN
    );
    if (wrapSolTx) transactions.push(wrapSolTx);
    const tx = (await routeProg.mutateAsync({
      params: {
        bidAmount: bidAmountBN,
        limit: limitBN,
        routes: route,
        sendAndConfirm: false,
      },
      accounts: {},
    })) as Transaction;
    transactions.push(tx);

    const askMint = new PublicKey(swapGlob.accounts.askMint);
    if (askMint.equals(WRAPPED_SOL_MINT)) {
      const unwrapSolTx = await createTxUnwrapSol(askMint);
      transactions.push(unwrapSolTx);
    }

    const txIds = await program.provider.sendAll(
      transactions.map((tx) => {
        return { tx, signers: [] };
      })
    );
    return txIds[txIds.length - 1];
  }, [
    askMintInfo.data?.value.decimals,
    bidMintInfo.data?.value.decimals,
    createTxUnwrapSol,
    createWrapSolTxIfNeed,
    initTokenAccountTxs,
    program.provider,
    routeProg,
    swapGlob.accounts.askMint,
    swapGlob.accounts.bidMint,
    swapGlob.bestRoute,
    swapGlob.params.bidAmount,
    swapGlob.params.limit,
  ]);

  return { swap };
};

export const useSwap = () => {
  //   const { swap: jupSwap } = useJupSwap();

  //   const { bestJupRoute, fetching } = useUnsafeSwap();
  const { swap: shieldSwap } = useShieldSwap();
  const [swapGlob, setSwapGlob] = useSwapGlob();
  const { bestShieldSwapRoute } = useBestShieldRoutes();

  //   const setBestJubRoute = useSwapStore(
  //     ({ setBestJubRoute }) => setBestJubRoute
  //   );
  //   const setBestSenRoute = useSwapStore(
  //     ({ setBestSenRoute }) => setBestSenRoute
  //   );
  //   const askMintAddress = useSwapStore(({ askMintAddress }) => askMintAddress);
  const { decimals: askDecimals = 0 } =
    useMintByAddress(swapGlob.accounts.askMint) || {};
  const platform = useMemo(() => {
    if (!bestShieldSwapRoute) return;

    // const { outAmount: jupOut } = bestJupRoute;
    const { askAmount: shieldSwapOut } = bestShieldSwapRoute;
    // const maxDiff = 0.05;
    // const difference = Math.abs(Number(jupOut) - Number(senswapOut));
    // const isJup = difference > maxDiff * Number(jupOut);

    // if (isJup) return Platform.Jup;
    return Platform.ShieldSwap;
  }, [bestShieldSwapRoute]);

  const routes = useMemo(() => {
    // if (!platform) return;
    // if (platform === Platform.Jup) return bestJupRoute;
    return bestShieldSwapRoute;
  }, [bestShieldSwapRoute]);

  const hops = useMemo(() => {
    if (!platform || !bestShieldSwapRoute) return [];
    const hops: string[] = [];
    // if (platform === Platform.Jup) {
    //   bestJupRoute.routePlan.forEach(
    //     ({ swapInfo: { inputMint, outputMint } }) => {
    //       hops.pop();
    //       hops.push(inputMint);
    //       hops.push(outputMint);
    //     }
    //   );
    // }

    if (platform === Platform.ShieldSwap) {
      bestShieldSwapRoute.route.forEach(({ askMint, bidMint }) => {
        hops.pop();
        hops.push(bidMint);
        hops.push(askMint);
      });
    }
    return hops;
  }, [bestShieldSwapRoute, platform]);

  const swap = useCallback(async () => {
    if (!platform) return "";
    // if (platform === Platform.Jup) return jupSwap();
    return shieldSwap();
  }, [platform, shieldSwap]);

  useEffect(() => {
    // const { outAmount } = bestJupRoute || {};
    const { askAmount } = bestShieldSwapRoute || {};

    if (!askAmount || !platform)
      setSwapGlob((prev) => ({
        ...prev,
        params: { ...prev.params, askAmount: 0 },
      }));
    else {
      setSwapGlob((prev) => ({
        ...prev,
        params: {
          ...prev.params,
          askAmount: Number(undecimalize(new BN(askAmount), askDecimals)),
        },
      }));
    }
    setSwapGlob((prev) => ({
      ...prev,
      bestRoute: bestShieldSwapRoute,
    }));
  }, [askDecimals, bestShieldSwapRoute, platform, setSwapGlob]);

  return { platform, swap, routes, hops };
};
