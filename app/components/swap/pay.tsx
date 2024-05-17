"use client";
import React, { useState } from "react";

import { useSwapGlob } from ".";
import { useTokenAccountBalance } from "@/hooks/useAccountData";
import { useTokenPriceCGKById } from "@/hooks/useCoinGecko";

import ModalTokenSelection from "../modal-token-selection";

export default function Pay() {
  const [swapGlob, setSwapGlob] = useSwapGlob();
  const [tokenId, setTokenId] = useState("solana");
  const tokenData = useTokenAccountBalance(
    // swapGlob?.accounts?.bidMint ||
    "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
  );
  const { data } = useTokenPriceCGKById({ id: tokenId });

  return (
    <div className="bg-[--bg-card] p-4 rounded-2xl flex justify-between">
      <div className=" space-y-1">
        <div>
          <span>You Pay</span>
        </div>
        <div>
          <input
            value={swapGlob?.params.bidAmount}
            type="number"
            placeholder="0.00"
            className="input p-0 focus:outline-none focus:border-transparent border-none w-5/6 max-w-xs text-2xl font-bold"
            onChange={(e) => {
              setSwapGlob((prev) => ({
                ...prev,
                params: {
                  ...prev?.params,
                  bidAmount: Number(e.target.value),
                },
              }));
            }}
          />

          <p className="text-[--disabled-color] text-sm">
            ${data?.data[tokenId].usd * swapGlob?.params.bidAmount || "0.0"}
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-end">
          <p className="text-secondary text-sm">
            Balance: {tokenData.data?.value.uiAmount?.toFixed(4)}
          </p>
        </div>
        <div>
          <ModalTokenSelection
            selectedAddress={swapGlob.accounts.bidMint}
            onChange={(mint) => {
              setSwapGlob((prev) => ({
                ...prev,
                accounts: {
                  ...prev?.accounts,
                  askMint: mint.address,
                },
              }));
            }}
          />
        </div>
      </div>
    </div>
  );
}
