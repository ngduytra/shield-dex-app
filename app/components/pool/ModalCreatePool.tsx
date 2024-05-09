"use client";

import { Add, ArrowDown2, ArrowUp2, Crown } from "iconsax-react";
import { useEffect, useState } from "react";
import Modal from "../modal";
import TokenSelection from "../token-selection";

const feeOptions = [
  {
    label: "0.01%",
    subLabel: "2% selected",
    value: "0.01",
  },
  {
    label: "0.02%",
    subLabel: "29% selected",
    value: "0.02",
  },
  {
    label: "0.03%",
    subLabel: "68% selected",
    value: "0.03",
  },
  {
    label: "0.04%",
    subLabel: "100% selected",
    value: "0.04",
  },
];

const customFeeOptions = [
  {
    label: "0.5%",
    subLabel: "0.1% selected",
    value: "0.5",
  },
  {
    label: "1%",
    subLabel: "0.1% selected",
    value: "1",
  },
  {
    label: "5%",
    subLabel: "0.1% selected",
    value: "5",
  },
  {
    label: "10%",
    subLabel: "0.1% selected",
    value: "10",
  },
];

const ModalCreatePool = () => {
  const [open, setOpen] = useState(false);
  const [openCustomFee, setOpenCustomFee] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {}, []);

  return (
    <>
      <button
        onClick={toggle}
        className="inline-flex items-center gap-1 text-secondary"
      >
        <Add className="text-secondary" size={16} />
        <span>Create pool</span>
      </button>
      <Modal className="!w-[560px]" open={open} onCancel={toggle}>
        <p className="font-bold text-xl mb-8">Create pool</p>
        <div className="mb-6">
          <p className="font-medium mb-2">Select token pair</p>
          <div className="flex gap-4">
            <TokenSelection classNames="flex-1" />
            <TokenSelection classNames="flex-1" />
          </div>
        </div>
        <div className="mb-6">
          <p className="font-medium mb-2">Select fee</p>
          <div className="flex gap-2">
            {feeOptions.map((opt, idx) => (
              <div key={`fee-${idx}`} className="flex-1">
                <input
                  type="radio"
                  id={opt.value}
                  name="fee"
                  value={opt.value}
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor={opt.value}
                  className="inline-flex items-center peer-checked:text-[--label-active] w-full p-2 text-secondary bg-[--bg-header] border border-[--stroke-default] rounded-lg cursor-pointer peer-checked:border-primary"
                >
                  <div className="block flex-1 peer-checked:text-red-500">
                    <div className="w-full mb-1">{opt.label}</div>
                    <div className="w-full h-[22px] flex items-center justify-center text-secondary text-xs rounded-[30px] bg-[--neutral-reverse]">
                      {opt.subLabel}
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className={openCustomFee ? "" : "hidden"}>
          <div className="flex items-center gap-1">
            <Crown variant="Bold" color="#C28B02" size={16} />
            <p className="text-[#C28B02] font-normal text-[14px]">Custom fee</p>
          </div>
          <p className="text-secondary text-xs leading-5 mb-3">
            You need to pay 5 SOL to use this Premium feature. Protocol fee will
            match the LP creator fee.
          </p>

          <div className={"flex gap-2 mb-3"}>
            {customFeeOptions.map((opt, idx) => (
              <div key={`custom-fee-${idx}`} className="flex-1">
                <input
                  type="radio"
                  id={opt.value}
                  name="custom-fee"
                  value={opt.value}
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor={opt.value}
                  className="inline-flex items-center peer-checked:text-[--label-active] w-full p-2 text-secondary bg-[--bg-header] border border-[--stroke-default] rounded-lg cursor-pointer peer-checked:border-primary"
                >
                  <div className="block flex-1 peer-checked:text-red-500">
                    <div className="w-full mb-1">{opt.label}</div>
                    <div className="w-full h-[22px] flex items-center justify-center text-secondary text-xs rounded-[30px] bg-[--neutral-reverse]">
                      {opt.subLabel}
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
        <label className="swap text-secondary text-[14px] mb-8">
          <input
            onClick={(e: any) => setOpenCustomFee(e.target?.checked)}
            type="checkbox"
          />
          <div className="swap-on flex gap-1 items-center">
            Hide <ArrowUp2 size={12} />
          </div>
          <div className="swap-off flex gap-1 items-center">
            Custom fee <ArrowDown2 size={12} />
          </div>
        </label>
        <div className="mb-8">
          <p className="text-primary-content font-medium">Referral fee</p>
          <p className="text-secondary text-[14px] mb-3">
            This is % of selected fee that goes to community users who add LP.
          </p>
          <label className="input flex items-center gap-2 rounded-[50px] bg-[--oncard-bg-default] focus-within:border-transparent focus-within:ring-0 focus-within:outline-none">
            <input
              type="text"
              className="grow placeholder:text-[14px]"
              placeholder="Input your referral fee"
            />
            <span>%</span>
          </label>
        </div>
        <div className="mb-8 space-y-3">
          <p className="text-primary-content font-medium">Deposit amount</p>
          <div className="bg-[--oncard-bg-default] p-3 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <input
                type="text"
                className="bg-transparent placeholder:text-2xl font-bold text-2xl placeholder:text-[--disabled-color] h-[34px] focus:outline-none focus:ring-0 flex-1"
                placeholder="0.00"
              />
              <div className="px-2 py-3 rounded-[30px] bg-[--bg-header] flex items-center gap-2">
                <div className="w-6 h-6 bg-black rounded-full"></div>
                <p>SOL</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-secondary text-[14px]">
              <p>0$</p>
              <p>Balance: 100</p>
            </div>
          </div>
          <div className="bg-[--oncard-bg-default] p-3 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <input
                type="text"
                className="bg-transparent placeholder:text-2xl font-bold text-2xl placeholder:text-[--disabled-color] h-[34px] focus:outline-none focus:ring-0 flex-1"
                placeholder="0.00"
              />
              <div className="px-2 py-3 rounded-[30px] bg-[--bg-header] flex items-center gap-2">
                <div className="w-6 h-6 bg-black rounded-full"></div>
                <p>USDC</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-secondary text-[14px]">
              <p>0$</p>
              <p>Balance: 100</p>
            </div>
          </div>
          <div className="border border-[--stroke-default] flex items-center justify-between py-3 px-4 rounded-xl bg-[--bg-header]">
            <p>Total deposit</p>
            <p>2$</p>
          </div>
        </div>
        <button className="container btn rounded-3xl btn-primary">
          Create
        </button>
      </Modal>
    </>
  );
};

export default ModalCreatePool;
