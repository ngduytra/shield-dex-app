"use client";
import React from "react";

import { useTokenAccountBalance } from "@/hooks/useAccountData";

export default function TokenBalance({
  tokenAddress,
}: {
  tokenAddress: string;
}) {
  const query = useTokenAccountBalance(tokenAddress);
  if (query.isLoading) return <p>Loading...</p>;

  console.log("tokenBalance", query.data);

  return (
    <div className="flex items-center justify-between text-secondary text-[14px]">
      <p>0$</p>
      <p>Balance: {query.data?.value?.uiAmount}</p>
    </div>
  );
}
