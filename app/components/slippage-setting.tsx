"use client";
import { EmptyWallet } from "iconsax-react";
import React, { useState } from "react";

import Modal from "./modal";

const enum Slippage {
  Auto = "auto",
  Low = 0.1,
  Medium = 0.5,
  High = 1,
  VeryHigh = 5,
}

export default function SlippageSetting() {
  const [open, setOpen] = useState(false);
  const [slippage, setSlippage] = useState(Slippage.Auto);
  return (
    <div className="flex justify-end">
      <button
        className="btn btn-ghost text-secondary"
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
                value={Slippage.Auto}
                className={`radio rounded-md rounded-br-none rounded-tr-none h-11 w-full z-50 ${
                  slippage === Slippage.Auto
                    ? "radio-primary checked:[--tw-bg-opacity:0]"
                    : ""
                }`}
                onClick={() => {
                  setSlippage(Slippage.Auto);
                }}
              />
            </div>
            <div className="relative w-1/5 flex justify-center items-center">
              <p className="absolute top-2 left-3 text-secondary">0.3%</p>
              <input
                type="radio"
                name="slippage-2"
                value={Slippage.Low}
                className={`radio rounded-none h-11 w-full z-50 ${
                  slippage === Slippage.Low
                    ? "radio-primary checked:[--tw-bg-opacity:0]"
                    : ""
                }`}
                onClick={() => {
                  setSlippage(Slippage.Low);
                }}
              />
            </div>
            <div className="relative w-1/5 flex justify-center items-center">
              <p className="absolute top-2 left-3 text-secondary">0.5%</p>
              <input
                type="radio"
                name="radio-1"
                className="radio rounded-none h-11 w-full"
              />
            </div>
            <div className="relative w-1/5 flex justify-center items-center">
              <p className="absolute top-2 left-3 text-secondary">1%</p>
              <input
                type="radio"
                name="radio-1"
                className="radio rounded-none h-11 w-full"
              />
            </div>
            <div className="relative w-1/5 flex justify-center items-center">
              <p className="absolute top-2 left-3 text-secondary">5%</p>
              <input
                type="radio"
                name="radio-1"
                className="radio rounded-md rounded-bl-none rounded-tl-none h-11 w-full"
              />
            </div>
          </div>
          <button className="container btn btn-primary rounded-3xl">
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}
