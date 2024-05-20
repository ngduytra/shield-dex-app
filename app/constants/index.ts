import { ShieldDexPg } from "@/program";
import { IdlAccounts } from "@coral-xyz/anchor";

export const CUSTOM_SOL = 5;
export type PoolData = IdlAccounts<ShieldDexPg>["pool"];
