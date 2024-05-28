import React from "react";
import { PoolData } from "@/constants";
import { useTokenAccountBalance } from "@/hooks/useAccountData";

type YourLiquidityProps = {
  poolData: PoolData;
};
export default function YourLiquidity({ poolData }: YourLiquidityProps) {
  const { data } = useTokenAccountBalance(poolData.lpMint.toBase58());
  return (
    <div className="col-span-1">
      <p className="text-[#6E7271] text-[14px] mb-1">Your Liquidity</p>
      <p className="font-bold">$ ___</p>
      <p className="text-[#6E7271] text-[14px]">
        {data?.value.uiAmount || 0} LP
      </p>
    </div>
  );
}
