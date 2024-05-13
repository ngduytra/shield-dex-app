"use client";
import React, { useEffect } from "react";
import { createGlobalState } from "react-use";
import { ArrowSwapHorizontal, ArrowSwapVertical } from "iconsax-react";

import SlippageSetting from "../slippage-setting";
import Pay from "./pay";
import Receive from "./receive";
import SwapInfo from "./swap-info";
import {
  useFetchOnePlatformConfig,
  useShieldDexUiProgram,
} from "@/hooks/useShieldDexProgram";
import { BN } from "@coral-xyz/anchor";
import Texture from "@/utils/texture";
import { useAnchorProvider } from "@/solana/solana-provider";
import { PublicKey } from "@solana/web3.js";
import toast from "react-hot-toast";
import { SwapAccounts, SwapParams } from "@/types/program";

export const useSwapGlob = createGlobalState<{
  accounts: SwapAccounts;
  params: SwapParams;
}>();

export default function Swap() {
  const provider = useAnchorProvider();
  const {
    fetchPool,
    initialize,
    fetchPlatformConfig,
    createPlatformConfig,
    swap,
  } = useShieldDexUiProgram();
  const { data } = useFetchOnePlatformConfig(
    "EpmL4ZAsdiKyp4DXEB3GS4zCzgPKTdLG8yqHdcZTnpXw"
  );

  if (fetchPlatformConfig.isLoading || fetchPool.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="space-y-2">
      {/* <button onClick={() => toast.success("test")}>test</button>
      <p className="text-2xl font-bold">
        {JSON.stringify(fetchPlatformConfig.data)}
      </p>
      <p className="text-2xl font-bold">{JSON.stringify(fetchPool.data)}</p>
      <button
        onClick={async () => {
          const ss = await initialize.mutateAsync({
            params: {
              amountA: new BN(100000000),
              amountB: new BN(10000000),
              fee: new BN(0),
              referralFee: new BN(0),
              solAmountForCustomFee: new BN(0),
            },
            accounts: {
              platformConfig: new PublicKey(
                "9ouGZCH6ufga8uw16xBze56AcMioh1HHsGy6vA5ESask"
              ),
              mintA: new PublicKey(
                "9mrvHjfQnP1t3BdtsAFVENnhatgsXV8FsD9t3QsHW6Za"
              ),
              mintB: new PublicKey(
                "Byq8MXRfLHfXPFNpua7v3H5HDuqjFwtmq5UikKU7yicf"
              ),
            },
          });

          console.log("sssajskdas", ss);
        }}
      >
        Create a pool
      </button>

      <button
        onClick={async () => {
          await createPlatformConfig.mutateAsync({
            params: {
              amount: new BN(1),
            },
            accounts: {},
          });
        }}
      >
        Create platform config
      </button>
      <button
        onClick={async () => {
          await swap.mutateAsync({
            params: {
              bidAmount: new BN(100000),
              limit: new BN(0),
            },
            accounts: {
              pool: new PublicKey(
                "13CQ7EfB8Hwy6FCY4sa7mhu2nY9NYAip5RC1LhCFZPst"
              ),
              platformConfig: new PublicKey(
                "9ouGZCH6ufga8uw16xBze56AcMioh1HHsGy6vA5ESask"
              ),
              bidMint: new PublicKey(
                "9mrvHjfQnP1t3BdtsAFVENnhatgsXV8FsD9t3QsHW6Za"
              ),
              askMint: new PublicKey(
                "Byq8MXRfLHfXPFNpua7v3H5HDuqjFwtmq5UikKU7yicf"
              ),
              taxman: new PublicKey(
                "CVkbpNdrD1hb6TDwiyaoEyrDUft4T7aM5PQifmtCnGb1"
              ),
            },
          });
        }}
      >
        Swap
      </button> */}
      <SlippageSetting />
      <div className="space-y-1">
        <Pay />
        <div className="flex container justify-center relative ">
          <button className="btn border-[--bg-body] border-3 rounded-lg bg-[--bg-card]  absolute -top-4 min-h-0 h-8 p-1">
            <ArrowSwapVertical size="24" />
          </button>
        </div>

        <Receive />
        <SwapInfo />
        <button className="container btn rounded-3xl btn-primary">
          <ArrowSwapHorizontal size="32" />
          Swap
        </button>
      </div>
    </div>
  );
}
