"use client";
import { useState } from "react";
import { createGlobalState } from "react-use";
import { Add } from "iconsax-react";

import Modal from "@/components/modal";
import CreatePoolContent from "./CreatePoolContent";
import {
  NomalizedInitializeAccounts,
  NormalizedInitializeParams,
} from "@/types/normalized-program-type";

export const useInitializePoolGlob = createGlobalState<{
  accounts: NomalizedInitializeAccounts;
  params: NormalizedInitializeParams;
}>({
  accounts: {
    platformConfig: "9hxGsUQMtXfdFnr24rXCFwmJfXUhQyEbo7keyD8z1Ryc",
    mintA: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    mintB: "HzwqbKZw8HxMN6bF2yFZNrht3c2iXXzpKcFu7uBEDKtr",
  },
  params: {
    amountA: 0,
    amountB: 0,
    referralFee: 0,
    solAmountForCustomFee: 0,
    fee: 0,
  },
});

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
        <CreatePoolContent />
      </Modal>
    </>
  );
};

export default ModalCreatePool;
