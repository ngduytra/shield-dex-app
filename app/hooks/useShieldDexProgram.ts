"use client";

import { BN, Program, utils, web3 } from "@coral-xyz/anchor";
import { useConnection } from "@solana/wallet-adapter-react";

import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCluster } from "../cluster/cluster-data-access";
import { useAnchorProvider } from "../solana/solana-provider";

import { IDL, programId } from "@/program";
import {
  CreatePlatformConfigAccounts,
  CreatePlatformConfigParams,
  InitializeAccounts,
  InitializeParams,
  SwapAccounts,
  SwapParams,
} from "@/types/program";
import { useTransactionToast } from "./useTransactionToast";

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
        .createPlatformConfig(params.amount)
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
          taxman: provider.publicKey,
          tokenProgram: utils.token.TOKEN_PROGRAM_ID,
          associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
          // rent: web3.SYSVAR_RENT_PUBKEY,
        })
        .signers([poolAB])
        .rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature, "Initialized successfully");
    },
    onError: (e) => {
      console.log(e);
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
      console.log(e);
      toast.error("Failed to swap ");
    },
  });

  return {
    program,
    programId,
    // getProgramAccount,
    swap,
    initialize,
    fetchPool,
    fetchPlatformConfig,
    createPlatformConfig,
  };
}
