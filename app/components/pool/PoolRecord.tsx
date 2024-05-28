import { ArrowSwapHorizontal } from "iconsax-react";
import ModalAddLiquidity from "./ModalAddLiqudity";
import RemoveLiquidity from "./RemoveLiquidity";
import { PoolData } from "@/constants";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import Liquidity from "./Liquidity";
import YourLiquidity from "./YourLiquidity";
import { web3 } from "@coral-xyz/anchor";
import PoolAsset from "./PoolAsset";
import YourShare from "./YourShare";

type PoolRecordProps = {
  poolAddress: web3.PublicKey;
  poolData: PoolData;
};
const PoolRecord = ({ poolAddress, poolData }: PoolRecordProps) => {
  const { mintA, mintB, lpFee } = poolData;
  const tokenAInfo = useTokenInfo(mintA.toBase58());
  const tokenBInfo = useTokenInfo(mintB.toBase58());

  return (
    <div className="collapse collapse-arrow bg-[--bg-header] mb-1 text-primary-content">
      <input type="radio" name="my-accordion-2" defaultChecked />
      <div className="collapse-title grid grid-cols-4 pr-0">
        <div className="col-span-1">
          <div className="flex">
            <div className="flex-1 flex gap-1 items-center">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar border-transparent">
                  <div className="w-9">
                    <img src={tokenAInfo.logoURI} alt="mint_A" />
                  </div>
                </div>
                <div className="avatar border-transparent">
                  <div className="w-9">
                    <img src={tokenBInfo.logoURI} alt="mint_B" />
                  </div>
                </div>
              </div>
              <div>
                <p className="font-medium leading-6">
                  {tokenAInfo.symbol}/{tokenBInfo.symbol}
                </p>
                <p className="bg-[--shadow] text-[#9FA1A0] h-[22px] rounded-[50px] text-center text-[14px]">
                  {lpFee.toString()}%
                </p>
              </div>
            </div>
          </div>
        </div>
        <Liquidity mintA={mintA.toBase58()} mintB={mintB.toBase58()} />
        <div className="col-span-1">___</div>
        <div className="col-span-1">___</div>
      </div>
      <div className="collapse-content grid grid-cols-4 py-2 pr-0">
        <YourLiquidity poolData={poolData} />
        <PoolAsset poolAddress={poolAddress} poolData={poolData} />
        <YourShare poolAddress={poolAddress} lpAddress={poolData.lpMint} />
        <div className="col-span-1 flex gap-2">
          <button className="w-10 h-10 rounded-full border border-[--stroke-default] flex items-center justify-center">
            <ArrowSwapHorizontal size={20} />
          </button>
          <RemoveLiquidity poolAddress={poolAddress} poolData={poolData} />
          <ModalAddLiquidity poolData={poolData} poolAddress={poolAddress} />
        </div>
      </div>
    </div>
  );
};

export default PoolRecord;
