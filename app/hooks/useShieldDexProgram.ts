"use client";

import { BN, Program, utils, web3 } from "@coral-xyz/anchor";
import { useConnection } from "@solana/wallet-adapter-react";

import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCluster } from "../cluster/cluster-data-access";
import { useAnchorProvider } from "../solana/solana-provider";

import { IDL, programId } from "@/program";
import {
  AddLiquidityAccounts,
  AddLiquidityParams,
  CreatePlatformConfigAccounts,
  CreatePlatformConfigParams,
  InitializeAccounts,
  InitializeParams,
  RemoveLiquidityAccounts,
  RemoveLiquidityParams,
  RouteAccounts,
  RouteParams,
  SwapAccounts,
  SwapParams,
} from "@/types/program";
import { useTransactionToast } from "./useTransactionToast";
import { PublicKey } from "@solana/web3.js";

export const useFetchOnePlatformConfig = (address: string) => {
  const provider = useAnchorProvider();
  const program = new Program(IDL, programId, provider);

  return useQuery({
    queryKey: ["fetch-platform-config", { address }],
    queryFn: () => program.account.platformConfig.fetch(address),
  });
};

export function useShieldDexUiProgram() {
  const { connection } = useConnection();
  const transactionToast = useTransactionToast();
  const { cluster } = useCluster();
  const provider = useAnchorProvider();
  const program = new Program(IDL, programId, provider);

  const fetchPlatformConfig = useQuery({
    queryKey: ["fetch-platform-config", { cluster }],
    queryFn: () => program.account.platformConfig.all(),
  });

  const fetchPool = useQuery({
    queryKey: ["fetch-pool", { cluster }],
    queryFn: () => program.account.pool.all(),
  });

  const createPlatformConfig = useMutation({
    mutationKey: ["shieldDexApp", "createPlatformConfig", { cluster }],
    mutationFn: async ({
      params,
      accounts,
    }: {
      params: CreatePlatformConfigParams;
      accounts: CreatePlatformConfigAccounts;
    }) => {
      const platformConfig = new web3.Keypair();
      return program.methods
        .createPlatformConfig(new BN(params.amount))
        .accounts({
          owner: provider.publicKey,
          platformConfig: platformConfig.publicKey,
          systemProgram: web3.SystemProgram.programId,
        })
        .signers([platformConfig])
        .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
    },
    onError: () => {
      toast.error("Failed to run program");
    },
  });

  const initialize = useMutation({
    mutationKey: ["shieldDexApp", "initialize", { cluster }],
    mutationFn: async ({
      params,
      accounts,
    }: {
      params: InitializeParams;
      accounts: InitializeAccounts;
    }) => {
      const poolAB = new web3.Keypair();
      const [escrowAB] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("escrow"), poolAB.publicKey.toBuffer()],
        program.programId
      );
      const [lpMintAB] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("lp_mint"), poolAB.publicKey.toBuffer()],
        program.programId
      );

      return program.methods
        .initialize(
          params.amountA,
          params.amountB,
          params.referralFee,
          params.solAmountForCustomFee,
          params.fee
          // new BN(1000000000000),
        )
        .accounts({
          authority: provider.publicKey,
          platformConfig: accounts.platformConfig,
          pool: poolAB.publicKey,
          mintA: accounts.mintA,
          srcA: utils.token.associatedAddress({
            owner: provider.publicKey,
            mint: accounts.mintA,
          }),
          treasuryA: utils.token.associatedAddress({
            owner: escrowAB,
            mint: accounts.mintA,
          }),
          mintB: accounts.mintB,
          srcB: utils.token.associatedAddress({
            owner: provider.publicKey,
            mint: accounts.mintB,
          }),
          treasuryB: utils.token.associatedAddress({
            owner: escrowAB,
            mint: accounts.mintB,
          }),
          lpMint: lpMintAB,
          dstLp: utils.token.associatedAddress({
            owner: provider.publicKey,
            mint: lpMintAB,
          }),
          escrow: escrowAB,
          taxman: new PublicKey("CVkbpNdrD1hb6TDwiyaoEyrDUft4T7aM5PQifmtCnGb1"),
          tokenProgram: utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
          rent: web3.SYSVAR_RENT_PUBKEY,
        })
        .signers([poolAB])
        .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature, "Initialized successfully");
    },
    onError: (e) => {
      toast.error("Failed to run program");
    },
  });

  const addLiquidity = useMutation({
    mutationKey: ["shieldDexApp", "addLiquidity", { cluster }],
    mutationFn: async ({
      params,
      accounts,
    }: {
      params: AddLiquidityParams;
      accounts: AddLiquidityAccounts;
    }) => {
      const [escrowAB] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("escrow"), accounts.pool.toBuffer()],
        program.programId
      );
      const [lpMintAB] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("lp_mint"), accounts.pool.toBuffer()],
        program.programId
      );

      return program.methods
        .addLiquidity(params.amountA, params.amountB)
        .accounts({
          authority: provider.publicKey,
          pool: accounts.pool,
          mintA: accounts.mintA,
          srcA: utils.token.associatedAddress({
            mint: accounts.mintA,
            owner: provider.publicKey,
          }),
          treasuryA: utils.token.associatedAddress({
            mint: accounts.mintA,
            owner: escrowAB,
          }),
          mintB: accounts.mintB,
          srcB: utils.token.associatedAddress({
            mint: accounts.mintB,
            owner: provider.publicKey,
          }),
          treasuryB: utils.token.associatedAddress({
            mint: accounts.mintB,
            owner: escrowAB,
          }),
          lpMint: lpMintAB,
          dstLp: utils.token.associatedAddress({
            mint: lpMintAB,
            owner: provider.publicKey,
          }),
          escrow: escrowAB,
          tokenProgram: utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
          rent: web3.SYSVAR_RENT_PUBKEY,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature, "Add liquidity successfully");
    },
    onError: (e) => {
      toast.error("Failed to run program");
    },
  });

  const removeLiquidity = useMutation({
    mutationKey: ["shieldDexApp", "removeLiquidity", { cluster }],
    mutationFn: async ({
      params,
      accounts,
    }: {
      params: RemoveLiquidityParams;
      accounts: RemoveLiquidityAccounts;
    }) => {
      const [escrowAB] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("escrow"), accounts.pool.toBuffer()],
        program.programId
      );
      const [lpMintAB] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("lp_mint"), accounts.pool.toBuffer()],
        program.programId
      );

      return program.methods
        .removeLiquidity(params.amountLp)
        .accounts({
          authority: provider.publicKey,
          pool: accounts.pool,
          mintA: accounts.mintA,
          treasuryA: utils.token.associatedAddress({
            mint: accounts.mintA,
            owner: escrowAB,
          }),
          dstA: utils.token.associatedAddress({
            mint: accounts.mintA,
            owner: provider.publicKey,
          }),
          mintB: accounts.mintB,
          treasuryB: utils.token.associatedAddress({
            mint: accounts.mintB,
            owner: escrowAB,
          }),
          dstB: utils.token.associatedAddress({
            mint: accounts.mintB,
            owner: provider.publicKey,
          }),
          lpMint: lpMintAB,
          srcLp: utils.token.associatedAddress({
            mint: lpMintAB,
            owner: provider.publicKey,
          }),
          escrow: escrowAB,
          tokenProgram: utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature, "Add liquidity successfully");
    },
    onError: (e) => {
      toast.error("Failed to run program");
    },
  });

  const swap = useMutation({
    mutationKey: ["shieldDexApp", "swap", { cluster }],
    mutationFn: async ({
      params,
      accounts,
    }: {
      params: SwapParams;
      accounts: SwapAccounts;
    }) => {
      const [escrowAB] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("escrow"), accounts.pool.toBuffer()],
        program.programId
      );

      return await program.methods
        .swap(params.bidAmount, params.limit)
        .accounts({
          authority: provider.publicKey,
          pool: accounts.pool,
          platformConfig: accounts.platformConfig,
          bidMint: accounts.bidMint,
          bidSrc: utils.token.associatedAddress({
            mint: accounts.bidMint,
            owner: provider.publicKey,
          }),
          bidTreasury: utils.token.associatedAddress({
            mint: accounts.bidMint,
            owner: escrowAB,
          }),
          askMint: accounts.askMint,
          askTreasury: utils.token.associatedAddress({
            mint: accounts.askMint,
            owner: escrowAB,
          }),
          askDst: utils.token.associatedAddress({
            mint: accounts.askMint,
            owner: provider.publicKey,
          }),
          escrow: escrowAB,
          taxman: accounts.taxman,
          taxDst: utils.token.associatedAddress({
            mint: accounts.bidMint,
            owner: accounts.taxman,
          }),
          tokenProgram: utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
          // rent: web3.SYSVAR_RENT_PUBKEY,
        })
        .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature, "Swapped successfully");
    },
    onError: (e) => {
      toast.error("Failed to swap ");
    },
  });

  const route = useMutation({
    mutationKey: ["shieldDexApp", "route", { cluster }],
    mutationFn: async ({
      params,
      accounts,
    }: {
      params: RouteParams;
      accounts: RouteAccounts;
    }) => {
      const remainingAccounts: any = [];
      params.routes.map((r) => {
        const [escrow] = web3.PublicKey.findProgramAddressSync(
          [Buffer.from("escrow"), new PublicKey(r.pool).toBuffer()],
          program.programId
        );
        remainingAccounts.push(
          ...[
            {
              pubkey: r.platformConfig,
              isWritable: false,
              isSigner: false,
            },
            {
              pubkey: new PublicKey(r.pool),
              isWritable: false,
              isSigner: false,
            },
            {
              pubkey: r.taxman,
              isWritable: false,
              isSigner: false,
            },
            {
              pubkey: r.bidAmount,
              isWritable: false,
              isSigner: false,
            },
            {
              pubkey: utils.token.associatedAddress({
                mint: new PublicKey(r.bidMint),
                owner: provider.publicKey,
              }),
              isWritable: true,
              isSigner: false,
            },
            {
              pubkey: utils.token.associatedAddress({
                mint: new PublicKey(r.bidMint),
                owner: escrow,
              }),
              isWritable: true,
              isSigner: false,
            },
            {
              pubkey: new PublicKey(r.askMint),
              isWritable: false,
              isSigner: false,
            },
            {
              pubkey: utils.token.associatedAddress({
                mint: new PublicKey(r.askMint),
                owner: escrow,
              }),
              isWritable: true,
              isSigner: false,
            },
            {
              pubkey: utils.token.associatedAddress({
                mint: new PublicKey(r.askMint),
                owner: provider.publicKey,
              }),
              isWritable: true,
              isSigner: false,
            },
            {
              pubkey: escrow,
              isWritable: false,
              isSigner: false,
            },
            {
              pubkey: utils.token.associatedAddress({
                mint: new PublicKey(r.bidMint),
                owner: r.taxman,
              }),
              isWritable: true,
              isSigner: false,
            },
          ]
        );
      });
      if (params.sendAndConfirm) {
        return await program.methods
          .route(params.bidAmount, params.limit)
          .accounts({
            authority: provider.publicKey,
            this: program.programId,
            tokenProgram: utils.token.TOKEN_PROGRAM_ID,
            associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
            systemProgram: web3.SystemProgram.programId,
            rent: web3.SYSVAR_RENT_PUBKEY,
          })
          .remainingAccounts(remainingAccounts)
          .rpc();
      }
      return await program.methods
        .route(params.bidAmount, params.limit)
        .accounts({
          authority: provider.publicKey,
          this: program.programId,
          tokenProgram: utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
          rent: web3.SYSVAR_RENT_PUBKEY,
        })
        .remainingAccounts(remainingAccounts)
        .transaction();
    },
    onSuccess: (signature) => {
      if (typeof signature === "string")
        transactionToast(signature, "Swapped successfully");
    },
    onError: (e) => {
      toast.error("Failed to swap ");
    },
  });

  return {
    program,
    programId,
    // getProgramAccount,
    removeLiquidity,
    swap,
    initialize,
    addLiquidity,
    fetchPool,
    fetchPlatformConfig,
    createPlatformConfig,
    route,
  };
}
