// Initialize pool
export type NormalizedInitializeParams = {
  amountA: number;
  amountB: number;
  referralFee: number;
  solAmountForCustomFee: number;
  fee: number;
};

export type NomalizedInitializeAccounts = {
  platformConfig: string;
  mintA: string;
  mintB: string;
};

export type NomalizedSwapParams = {
  bidAmount: number;
  limit: number;
};

export type NomalizedSwapAccounts = {
  pool?: string;
  platformConfig?: string;
  bidMint: string;
  askMint: string;
  taxman: string;
};
