import React, { useCallback } from "react";

import TokenSelection from "../token-selection";
import { ArrowSwapHorizontal, InfoCircle } from "iconsax-react";

export default function SwapInfo() {
  const infos = useCallback(() => {
    return [
      {
        label: "Exchange rate",
        content: (
          <div className="flex flex-nowrap items-center space-x-2">
            <ArrowSwapHorizontal size={16} />
            <p className="font-bold">1 SOL ~ 1,5 FCON</p>
          </div>
        ),
      },
      {
        label: "Estimated received",
        content: (
          <div>
            <p>2,866,156.5 FCON</p>
          </div>
        ),
      },
      {
        label: "Price impact",
        content: (
          <div>
            <p className="text-[--chart-up]">{"< 0,1 %"}</p>
          </div>
        ),
      },
      {
        label: "Route",
        content: (
          <div>
            <p>SOL - USDT - FCON</p>
          </div>
        ),
      },
      {
        label: (
          <div className="flex flex-nowrap space-x-1 align-middle">
            <p>Fees</p>
            <div
              className="flex tooltip tooltip-info align-middle"
              data-tip="info"
            >
              <button>
                <InfoCircle size="16" />
              </button>
            </div>
          </div>
        ),
        content: (
          <div>
            <p>0.0003 SOL</p>
          </div>
        ),
      },
      {
        label: "Referral fee",
        content: (
          <div>
            <p>0.0003 SOL</p>
          </div>
        ),
      },
    ];
  }, []);

  return (
    <div className="bg-[--bg-card] p-4 rounded-2xl ">
      <div className=" space-y-3">
        {infos().map((info, idx) => {
          // if (idx > 2) {
          //   <div className="container flex justify-between" key={info.label}>
          //     <h6>{info.label}</h6>
          //     {info.content}
          //   </div>;
          // }
          return (
            <div
              className="container  flex justify-between"
              key={info.label.toString()}
            >
              <p className="text-secondary text-sm">{info.label}</p>
              {info.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
