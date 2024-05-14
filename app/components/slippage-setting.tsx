"use client";
import { EmptyWallet } from "iconsax-react";
import React, { useState } from "react";

import Modal from "./modal";
import { useSwapGlob } from "./swap";

const enum Slippage {
  Auto = "auto",
  Low = 0.1,
  Medium = 0.5,
  High = 1,
  VeryHigh = 5,
}

const SlippageValue: Record<Slippage, number> = {
  [Slippage.Auto]: 0,
  [Slippage.Low]: 0.1,
  [Slippage.Medium]: 0.5,
  [Slippage.High]: 1,
  [Slippage.VeryHigh]: 5,
};

export default function SlippageSetting() {
  const [open, setOpen] = useState(false);
  const [swapGlob, setSwapGlob] = useSwapGlob();
  const [slippage, setSlippage] = useState(Slippage.Auto);
  return (
    <div className="flex justify-end">
      <button
        className="btn btn-ghost text-secondary font-light"
        onClick={() => setOpen(true)}
      >
        <EmptyWallet size="16" />
        <p>0.5%</p>
      </button>
      <Modal open={open} onCancel={() => setOpen(false)} className="max-w-sm">
        <div className="space-y-7">
          <p>Slippage Settings</p>
          <div className="container flex justify-between">
            <div className="relative w-1/5 flex justify-center items-center">
              <p className="absolute top-2 left-3 text-secondary">Auto</p>
              <input
                type="radio"
                name="slippage-1"
                value={SlippageValue[Slippage.Auto]}
                className={`radio rounded-md rounded-br-none rounded-tr-none h-11 w-full z-50 ${
                  swapGlob?.params.limit === SlippageValue[Slippage.Auto]
                    ? "radio-primary checked:[--tw-bg-opacity:0]"
                    : ""
                }`}
                onClick={() => {
                  setSwapGlob((prev) => ({
                    ...prev,
                    params: {
                      ...prev?.params,
                      limit: SlippageValue[Slippage.Auto],
                    },
                  }));
                }}
              />
            </div>
            <div className="relative w-1/5 flex justify-center items-center">
              <p className="absolute top-2 left-3 text-secondary">0.3%</p>
              <input
                type="radio"
                name="slippage-2"
                value={SlippageValue[Slippage.Low]}
                className={`radio rounded-none h-11 w-full z-50 ${
                  swapGlob?.params.limit === SlippageValue[Slippage.Low]
                    ? "radio-primary checked:[--tw-bg-opacity:0]"
                    : ""
                }`}
                onClick={() => {
                  setSwapGlob((prev) => ({
                    ...prev,
                    params: {
                      ...prev?.params,
                      limit: SlippageValue[Slippage.Low],
                    },
                  }));
                }}
              />
            </div>
            <div className="relative w-1/5 flex justify-center items-center">
              <p className="absolute top-2 left-3 text-secondary">0.5%</p>
              <input
                type="radio"
                name="radio-1"
                value={SlippageValue[Slippage.Medium]}
                className={`radio rounded-none h-11 w-full z-50 ${
                  swapGlob?.params.limit === SlippageValue[Slippage.Medium]
                    ? "radio-primary checked:[--tw-bg-opacity:0]"
                    : ""
                }`}
                onClick={() => {
                  setSwapGlob((prev) => ({
                    ...prev,
                    params: {
                      ...prev?.params,
                      limit: SlippageValue[Slippage.Medium],
                    },
                  }));
                }}
              />
            </div>
            <div className="relative w-1/5 flex justify-center items-center">
              <p className="absolute top-2 left-3 text-secondary">1%</p>
              <input
                type="radio"
                name="radio-1"
                value={SlippageValue[Slippage.High]}
                className={`radio rounded-none h-11 w-full z-50 ${
                  swapGlob?.params.limit === SlippageValue[Slippage.High]
                    ? "radio-primary checked:[--tw-bg-opacity:0]"
                    : ""
                }`}
                onClick={() => {
                  setSwapGlob((prev) => ({
                    ...prev,
                    params: {
                      ...prev?.params,
                      limit: SlippageValue[Slippage.High],
                    },
                  }));
                }}
              />
            </div>
            <div className="relative w-1/5 flex justify-center items-center">
              <p className="absolute top-2 left-3 text-secondary">5%</p>
              <input
                type="radio"
                name="radio-1"
                value={SlippageValue[Slippage.VeryHigh]}
                className={`radio rounded-md rounded-bl-none rounded-tl-none h-11 w-full ${
                  swapGlob?.params.limit === SlippageValue[Slippage.VeryHigh]
                    ? "radio-primary checked:[--tw-bg-opacity:0]"
                    : ""
                }`}
                onClick={() => {
                  setSwapGlob((prev) => ({
                    ...prev,
                    params: {
                      ...prev?.params,
                      limit: SlippageValue[Slippage.VeryHigh],
                    },
                  }));
                }}
              />
            </div>
          </div>
          <button
            className="container btn btn-primary rounded-3xl"
            onClick={() => setOpen(false)}
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}
