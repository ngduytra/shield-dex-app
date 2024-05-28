"use client";

import Modal from "@/components/modal";
import { Add, AddSquare } from "iconsax-react";
import { useCallback, useState } from "react";
import AddLiquidityDetail from "./AddLiquidityDetail";
import ModalTokenSelection from "@/components/modal-token-selection";
import { PoolData } from "@/constants";
import { useTokenAccountBalance } from "@/hooks/useAccountData";
import { useTokenPriceCGKByAddress } from "@/hooks/useCoinGecko";
import { useShieldDexUiProgram } from "@/hooks/useShieldDexProgram";
import { AddLiquidityAccounts, AddLiquidityParams } from "@/types/program";
import { web3 } from "@coral-xyz/anchor";
import { useGetTokenInfo } from "@/hooks/useTokenInfo";
import toast from "react-hot-toast";
import { decimalize } from "@/helpers/decimals";

type ModalAddLiquidityProps = {
  poolData: PoolData;
  poolAddress: web3.PublicKey;
};

const ModalAddLiquidity = ({
  poolAddress,
  poolData,
}: ModalAddLiquidityProps) => {
  const [open, setOpen] = useState(false);
  const [amountA, setAmountA] = useState(0);
  const [amountB, setAmountB] = useState(0);
  const { getTokenInfo } = useGetTokenInfo();
  const tokenAData = useTokenAccountBalance(poolData.mintA.toBase58());
  const tokenBData = useTokenAccountBalance(poolData.mintB.toBase58());
  const tokenAPrice = useTokenPriceCGKByAddress(poolData.mintA.toBase58());
  const tokenBPrice = useTokenPriceCGKByAddress(poolData.mintB.toBase58());
  const { addLiquidity } = useShieldDexUiProgram();

  const toggle = () => {
    setOpen(!open);
  };

  const onAddLiquidity = useCallback(async () => {
    const mintAInfo = getTokenInfo(poolData.mintA.toBase58());
    const mintBInfo = getTokenInfo(poolData.mintB.toBase58());

    if (!mintAInfo || !mintBInfo) return toast.error("Token is not valid");

    const decimalizedAmountA = decimalize(
      amountA.toString(),
      mintAInfo?.decimals
    );
    const decimalizedAmountB = decimalize(
      amountB.toString(),
      mintBInfo?.decimals
    );

    const data: {
      accounts: AddLiquidityAccounts;
      params: AddLiquidityParams;
    } = {
      accounts: {
        mintA: poolData.mintA,
        mintB: poolData.mintB,
        pool: poolAddress,
      },
      params: {
        amountA: decimalizedAmountA,
        amountB: decimalizedAmountB,
      },
    };

    await addLiquidity.mutateAsync(data);
  }, [
    addLiquidity,
    amountA,
    amountB,
    getTokenInfo,
    poolAddress,
    poolData.mintA,
    poolData.mintB,
  ]);

  return (
    <>
      <button
        onClick={toggle}
        className="h-10 w-fit flex items-center justify-center gap-4 px-3 rounded-[100px] bg-primary text-black font-medium"
      >
        <Add size={20} />
        Add liquidity
      </button>
      <Modal
        className="flex flex-col gap-8 overflow-y-visible"
        open={open}
        onCancel={toggle}
      >
        <p className="text-xl font-bold">Add liquidity</p>
        <div>
          <div className="flex items-center justify-between mb-2">
            <input
              type="number"
              className="focus:ring-0 focus:outline-none h-[35px] text-lg placeholder:text-lg"
              placeholder="0.00"
              value={amountA}
              onChange={(e) => {
                console.log("thogn tin addres:S: ", e.target.value);
                setAmountA(Number(e.target.value));
              }}
            />
            <ModalTokenSelection
              disabled={true}
              selectedAddress={poolData.mintA.toBase58()}
            />
          </div>
          <div className="text-[--disabled-color] text-[14px] flex items-center justify-between">
            <p>
              ${tokenAPrice.data?.data[poolData.mintA.toBase58()]?.usd || 0}
            </p>
            <p>Balance: {tokenAData.data?.value.uiAmount?.toFixed(4) || 0.0}</p>
          </div>
        </div>
        <div className="relative h-[1.5px] bg-[--stroke-default]">
          <AddSquare
            variant="Outline"
            className="text-secondary bg-[--bg-header] absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 "
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <input
              type="number"
              className="focus:ring-0 focus:outline-none h-[35px] text-lg placeholder:text-lg"
              placeholder="0.00"
              value={amountB}
              onChange={(e) => setAmountB(Number(e.target.value))}
            />
            <ModalTokenSelection
              disabled={true}
              selectedAddress={poolData.mintB.toBase58()}
            />
          </div>
          <div className="text-[--disabled-color] text-[14px] flex items-center justify-between">
            <p>
              ${tokenBPrice.data?.data[poolData.mintB.toBase58()]?.usd || 0}
            </p>
            <p>Balance: {tokenBData.data?.value.uiAmount?.toFixed(4) || 0.0}</p>
          </div>
        </div>
        <AddLiquidityDetail />
        <button
          className="container btn rounded-3xl btn-primary"
          onClick={onAddLiquidity}
        >
          Create
        </button>
      </Modal>
    </>
  );
};

export default ModalAddLiquidity;
