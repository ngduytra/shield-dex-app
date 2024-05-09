"use client";

import { Add } from "iconsax-react";
import { useState } from "react";
import Modal from "../modal";
import TokenSelection from "../token-selection";

const RadioFee = (params: {
  value: string;
  name: string;
  label: string;
  subLabel: string;
}) => {
  const { label, subLabel, value, name } = params;
  return (
    <div className="flex-1">
      <input
        type="radio"
        id={value}
        name={name}
        value={value}
        className="hidden peer"
        required
      />
      <label
        htmlFor={value}
        className="inline-flex items-center peer-checked:text-[--label-active] w-full p-2 text-secondary bg-white border border-[--stroke-default] rounded-lg cursor-pointer peer-checked:border-primary"
      >
        <div className="block flex-1">
          <div className="w-full mb-1">{label}</div>
          <div className="w-full h-[22px] flex items-center justify-center text-secondary text-xs rounded-[30px] bg-[--neutral-reverse]">
            {subLabel}
          </div>
        </div>
      </label>
    </div>
  );
};

const ModalCreatePool = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

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
        <div>
          <p className="font-medium mb-2">Select fee</p>
          <div className="flex gap-2">
            <RadioFee
              label="0.01%"
              subLabel="2% selected"
              value="0.01"
              name="fee"
            />
            <RadioFee
              label="0.01%"
              subLabel="2% selected"
              value="0.02"
              name="fee"
            />
            <RadioFee
              label="0.01%"
              subLabel="2% selected"
              value="0.03"
              name="fee"
            />
            <RadioFee
              label="0.01%"
              subLabel="2% selected"
              value="0.04"
              name="fee"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalCreatePool;
