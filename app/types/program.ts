import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

// Platform fee
export type CreatePlatformConfigParams = {
  amount: string;
};

export type CreatePlatformConfigAccounts = {
  //   owner: PublicKey;
};

// Initialize pool
export type InitializeParams = {
  amountA: BN;
  amountB: BN;
  referralFee: BN;
  solAmountForCustomFee: BN;
  fee: BN;
};

export type InitializeAccounts = {
  platformConfig: PublicKey;
  mintA: PublicKey;
  mintB: PublicKey;
};

// swap
export type SwapParams = {
  bidAmount: BN;
  limit: BN;
};

export type SwapAccounts = {
  pool: PublicKey;
  platformConfig: PublicKey;
  bidMint: PublicKey;
  askMint: PublicKey;
  taxman: PublicKey;
};
