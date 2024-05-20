import { useState } from "react";
import { useSwapGlob } from ".";
import ModalTokenSelection from "../modal-token-selection";
import { useTokenAccountBalance } from "@/hooks/useAccountData";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useTokenPriceCGKById } from "@/hooks/useCoinGecko";

export default function Receive() {
  const [swapGlob, setSwapGlob] = useSwapGlob();
  const tokenInfo = useTokenInfo(swapGlob.accounts.askMint);
  const [tokenId, setTokenId] = useState(tokenInfo.extensions?.coingeckoId);
  const tokenData = useTokenAccountBalance(swapGlob?.accounts?.askMint);
  const { data } = useTokenPriceCGKById({ id: tokenId || "" });

  return (
    <div className="bg-[--bg-header] p-4 rounded-2xl flex justify-between">
      <div className=" space-y-3">
        <div className="text-primary-content">
          <span>You will receive</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-primary-content leading-[34px]">
            {swapGlob.params.askAmount}
          </p>
          <p className="text-secondary text-sm font-light leading-[22px]">
            $1,942.5
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-secondary text-sm">
            Balance: {tokenData.data?.value.uiAmount || 0.0}
          </p>
        </div>
        <div className="flex justify-end">
          <ModalTokenSelection
            selectedAddress={swapGlob.accounts.askMint}
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
