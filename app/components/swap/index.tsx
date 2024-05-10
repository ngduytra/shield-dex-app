"use client";
import React, { useEffect } from "react";
import {
  ArrangeVerticalCircle,
  ArrowSwapHorizontal,
  ArrowSwapVertical,
} from "iconsax-react";

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
          <button className="btn border-[--bg-body] border-[4px] flex items-center justify-center rounded-lg bg-[--bg-header] text-secondary absolute -top-4 min-h-0 w-10 h-10 p-1">
            <ArrangeVerticalCircle className="hover:rotate-180 transform transition-transform duration-200 ease-linear" size="24" />
          </button>
        </div>

        <Receive />
        <SwapInfo />
        <button className="container btn rounded-3xl btn-primary text-primary-content">
          <ArrowSwapHorizontal size="32" />
          Swap
        </button>
      </div>
    </div>
  );
}
