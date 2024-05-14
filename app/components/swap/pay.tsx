import React, { useState } from "react";

import TokenSelection from "../token-selection";
import { useSwapGlob } from ".";
import { useTokenAccountBalance } from "@/hooks/useAccountData";
import { PublicKey } from "@solana/web3.js";
import { useAnchorProvider } from "@/solana/solana-provider";
import { utils } from "@coral-xyz/anchor";
import { useTokenPriceCGK } from "@/hooks/useCoinGecko";

import ModalTokenSelection from "../modal-token-selection";

export default function Pay() {
  const provider = useAnchorProvider();
  const [swapGlob, setSwapGlob] = useSwapGlob();
  const [tokenId, setTokenId] = useState("solana");
  const tokenData = useTokenAccountBalance({
    address: utils.token.associatedAddress({
      owner: provider.publicKey,
      mint: new PublicKey(
        swapGlob?.accounts?.bidMint ||
          "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
      ),
    }),
  });
  const { data } = useTokenPriceCGK({ id: tokenId });

  console.log("tokenData", data?.data[tokenId].usd);
  console.log("bidAmount: ", swapGlob?.params?.bidAmount);

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
              console.log("ajasjdkajsk:", e.target.value);
              setSwapGlob((prev) => ({
                ...prev,
                params: {
                  ...prev?.params,
                  bidAmount: e.target.value,
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
          <ModalTokenSelection />
        </div>
      </div>
    </div>
  );
}
