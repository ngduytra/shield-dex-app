"use client";
import { useCallback, useState } from "react";

import { Minus } from "iconsax-react";

import Modal from "../modal";
import { useTokenInfo } from "@/hooks/useTokenInfo";
import { useTokenAccountBalance } from "@/hooks/useAccountData";
import { PoolData } from "@/constants";
import { web3 } from "@coral-xyz/anchor";
import { useTokenPriceCGKByAddress } from "@/hooks/useCoinGecko";
import { useShieldDexUiProgram } from "@/hooks/useShieldDexProgram";
import toast from "react-hot-toast";
import { decimalize } from "@/helpers/decimals";
import {
  RemoveLiquidityAccounts,
  RemoveLiquidityParams,
} from "@/types/program";

type RemoveLiquidityProps = {
  poolData: PoolData;
  poolAddress: web3.PublicKey;
};

const RemoveLiquidity = ({ poolAddress, poolData }: RemoveLiquidityProps) => {
  const [open, setOpen] = useState(false);
  const [lpAmount, setLpAmount] = useState(0);
  const lpInfo = useTokenInfo(poolData.lpMint.toBase58());
  const tokenAInfo = useTokenInfo(poolData.mintA.toBase58());
  const tokenBInfo = useTokenInfo(poolData.mintB.toBase58());
  const lpBalance = useTokenAccountBalance(poolData.lpMint.toBase58());
  const lpPrice = useTokenPriceCGKByAddress(poolData.lpMint.toBase58());

  const { removeLiquidity } = useShieldDexUiProgram();

  const toggle = () => {
    setOpen(!open);
  };

  const onRemoveLiquidity = useCallback(async () => {
    if (!lpInfo) return toast.error("Token is not valid");

    const decimalizedLpAmount = decimalize(
      lpAmount.toString(),
      lpInfo?.decimals
    );

    const data: {
      accounts: RemoveLiquidityAccounts;
      params: RemoveLiquidityParams;
    } = {
      accounts: {
        mintA: poolData.mintA,
        mintB: poolData.mintB,
        pool: poolAddress,
      },
      params: {
        amountLp: decimalizedLpAmount,
      },
    };

    await removeLiquidity.mutateAsync(data);
    setOpen(false);
  }, [
    lpAmount,
    lpInfo,
    poolAddress,
    poolData.mintA,
    poolData.mintB,
    removeLiquidity,
  ]);

  return (
    <>
      <button
        onClick={toggle}
        className="w-10 h-10 rounded-full border border-[--stroke-default] flex items-center justify-center"
      >
        <Minus size={20} />
      </button>
      <Modal className="flex flex-col gap-8" open={open} onCancel={toggle}>
        <p className="text-xl font-bold">Remove liquidity</p>
        <div>
          <div className="flex items-center justify-between mb-2">
            {/* <p className="text-primary-content text-2xl">988,648</p> */}
            <input
              type="number"
              className="focus:ring-0 focus:outline-none h-[35px] text-lg placeholder:text-lg"
              placeholder="0.00"
              value={lpAmount}
              onChange={(e) => {
                setLpAmount(Number(e.target.value));
              }}
            />
            <div className="rounded-[30px] flex items-center gap-1 border border-[--stroke-default] w-fit px-[6px] py-1">
              <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                <div className="avatar border-transparent">
                  <div className="w-6">
                    <img src="https://s3-alpha.figma.com/hub/file/2204229748/ad1d22a9-445a-4a9d-8ad2-117c2ae9a299-cover.png" />
                  </div>
                </div>
                <div className="avatar border-transparent">
                  <div className="w-6">
                    <img src="https://s3-alpha.figma.com/hub/file/2204229748/ad1d22a9-445a-4a9d-8ad2-117c2ae9a299-cover.png" />
                  </div>
                </div>
              </div>
              <p>
                {tokenAInfo.symbol}/{tokenBInfo.symbol}
              </p>
            </div>
          </div>
          <div className="text-[14px] text-secondary font-light flex justify-between">
            <p>${lpPrice.data?.data[poolData.lpMint.toBase58()]?.usd || 0}</p>
            <p>Balance: {lpBalance.data?.value.uiAmount} LP</p>
          </div>
        </div>
        <button
          className="container btn rounded-3xl btn-primary"
          onClick={onRemoveLiquidity}
        >
          Remove
        </button>
      </Modal>
    </>
  );
};

export default RemoveLiquidity;
