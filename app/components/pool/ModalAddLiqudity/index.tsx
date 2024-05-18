"use client";

import Modal from "@/components/modal";
import TokenSelection from "@/components/token-selection";
import { Add, AddSquare } from "iconsax-react";
import { useState } from "react";
import AddLiquidityDetail from "./AddLiquidityDetail";
import ModalTokenSelection from "@/components/modal-token-selection";

const ModalAddLiquidity = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

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
              type="text"
              className="focus:ring-0 focus:outline-none h-[35px] text-lg placeholder:text-lg"
              placeholder="0.00"
            />
            <ModalTokenSelection onChange={() => {}} selectedAddress="" />
          </div>
          <div className="text-[--disabled-color] text-[14px] flex items-center justify-between">
            <p>$925</p>
            <p>Balance: 10.5</p>
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
              type="text"
              className="focus:ring-0 focus:outline-none h-[35px] text-lg placeholder:text-lg"
              placeholder="0.00"
            />
            <ModalTokenSelection onChange={() => {}} selectedAddress="" />
          </div>
          <div className="text-[--disabled-color] text-[14px] flex items-center justify-between">
            <p>$925</p>
            <p>Balance: 10.5</p>
          </div>
        </div>
        <AddLiquidityDetail />
        <button className="container btn rounded-3xl btn-primary">
          Create
        </button>
      </Modal>
    </>
  );
};

export default ModalAddLiquidity;
