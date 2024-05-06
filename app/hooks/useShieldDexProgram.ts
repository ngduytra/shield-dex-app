"use client";

import { Program, utils, web3 } from "@coral-xyz/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";
// import toast from 'react-hot-toast';
import { useCluster } from "../cluster/cluster-data-access";
import { useAnchorProvider } from "../solana/solana-provider";
// import { useTransactionToast } from "../ui/ui-layout";
import { IDL, programId } from "@/program";
import { InitializeAccounts, InitializeParams } from "@/types/program";

export function useShieldDexUiProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  console.log("cluster", cluster);
  //   const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const program = new Program(IDL, programId, provider);

  const getProgramAccount = useQuery({
    queryKey: ["get-program-account", { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const fetchPool = useQuery({
    queryKey: ["fetch-pool"],
    queryFn: () => program.account.pool.all(),
  });

  const initialize = useMutation({
    mutationKey: ["shieldDexUi", "greet", { cluster }],
    mutationFn: ({
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
          rent: web3.SYSVAR_RENT_PUBKEY,
        })
        .signers([poolAB])
        .rpc();
    },
    onSuccess: (signature) => {
      //   transactionToast(signature);
    },
    onError: () => {
      // toast.error("Failed to run program"
    },
  });

  return {
    program,
    programId,
    getProgramAccount,
    initialize,
    fetchPool,
  };
}
