"use client";

import { Minus } from "iconsax-react";
import { useState } from "react";
import Modal from "../modal";

const RemoveLiquidity: React.FC = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <button
        onClick={toggle}
        className="w-10 h-10 rounded-full border border-[--stroke-default] flex items-center justify-center"
      >
        <Minus size={20} />
      </button>
      <Modal className="flex flex-col gap-8" open={open} onCancel={toggle}>
        <p className="text-xl font-bold">Remove liquidity</p>
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-primary-content text-2xl">988,648</p>
            <div className="rounded-[30px] flex items-center gap-1 border border-[--stroke-default] w-fit px-[6px] py-1">
              <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                <div className="avatar border-transparent">
                  <div className="w-6">
                    <img src="https://s3-alpha.figma.com/hub/file/2204229748/ad1d22a9-445a-4a9d-8ad2-117c2ae9a299-cover.png" />
                  </div>
                </div>
                <div className="avatar border-transparent">
                  <div className="w-6">
                    <img src="https://s3-alpha.figma.com/hub/file/2204229748/ad1d22a9-445a-4a9d-8ad2-117c2ae9a299-cover.png" />
                  </div>
                </div>
              </div>
              <p>SOL/FCON</p>
            </div>
          </div>
          <div className="text-[14px] text-secondary font-light flex justify-between">
            <p>$1850</p>
            <p>Balance: 988,123 LP</p>
          </div>
        </div>
        <button className="container btn rounded-3xl btn-primary">
          Create
        </button>
      </Modal>
    </>
  );
};

export default RemoveLiquidity;
