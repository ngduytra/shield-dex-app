import { PublicKey } from "@solana/web3.js";

export type InitializeParams = {
  amountA: string;
  amountB: string;
  referralFee: string;
  solAmountForCustomFee: number;
  fee: boolean;
};

export type InitializeAccounts = {
  platformConfig: PublicKey;
  mintA: PublicKey;
  mintB: PublicKey;
};
