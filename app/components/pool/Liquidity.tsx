import { useTokenAccountBalance } from "@/hooks/useAccountData";
import { useTokenPriceCGKByAddress } from "@/hooks/useCoinGecko";
import React, { useMemo } from "react";

type LiquidityProps = {
  mintA: string;
  mintB: string;
};

export default function Liquidity({ mintA, mintB }: LiquidityProps) {
  const balanceA = useTokenAccountBalance(mintA);
  const balanceB = useTokenAccountBalance(mintB);
  const tokenAPrice = useTokenPriceCGKByAddress(mintA);
  const tokenBPrice = useTokenPriceCGKByAddress(mintB);

  const liquidity = useMemo(() => {
    return (
      (balanceA.data?.value.uiAmount || 0) *
        (tokenAPrice.data?.data[mintA]?.usd || 0) +
        (balanceB.data?.value.uiAmount || 0) *
          tokenBPrice.data?.data[mintB]?.usd || 0
    );
  }, [
    balanceA.data?.value.uiAmount,
    balanceB.data?.value.uiAmount,
    mintA,
    mintB,
    tokenAPrice.data?.data,
    tokenBPrice.data?.data,
  ]);
  return <div className="col-span-1">${liquidity}</div>;
}
