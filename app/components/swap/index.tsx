"use client";
import React, { useEffect } from "react";
import { ArrowSwapHorizontal, ArrowSwapVertical } from "iconsax-react";

import SlippageSetting from "../slippage-setting";
import Pay from "./pay";
import Receive from "./receive";
import SwapInfo from "./swap-info";
import { useShieldDexUiProgram } from "@/hooks/useShieldDexProgram";

export default function Swap() {
  const { fetchPool } = useShieldDexUiProgram();

  useEffect(() => {
    fetchPool.refetch();
    console.log("fetchPool.data: ", fetchPool.data);
  });

  return (
    <div className="space-y-2">
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
