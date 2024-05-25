import Image from "next/image";
import SolanaLogo from "@/assets/images/phantomwallet_logo.png";
import { useWallet } from "@solana/wallet-adapter-react";
import { shortAddress } from "@/utils/string";
import {
  ArrowDown,
  ArrowSwapHorizontal,
  Copy,
  ExportSquare,
  Logout,
  Setting2,
} from "iconsax-react";

const SwapTransaction = () => {
  return (
    <div className="flex justify-between py-4">
      <div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black rounded-full"></div>
          <p className="text-[14px] text-primary-content">
            10.5 <span className="text-[14px] text-secondary">SOL</span>
          </p>
        </div>
        <ArrowDown size={12} className="text-secondary my-2 mx-[6px] " />
        <div className="flex items-center gap-1 mb-2">
          <div className="w-6 h-6 bg-black rounded-full"></div>
          <p className="text-[14px] text-primary-content">
            10.5 <span className="text-[14px] text-secondary">SOL</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs leading-5 text-[--disabled-color] font-light">
            1 SOL ~ 273,073 FCON
          </p>
          <button>
            <ArrowSwapHorizontal
              size={16}
              className="text-[--disabled-color]"
            />
          </button>
        </div>
      </div>
      <div>
        <ExportSquare size={16} className="text-[--disabled-color] mb-3" />
        <p className="text-secondary text-[14px] font-light">2 hours</p>
      </div>
    </div>
  );
};

const SwapHistory = () => {
  const { publicKey } = useWallet();
  return (
    <>
      <div className="p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={SolanaLogo}
                width={36}
                height={36}
                alt="logo"
                className="rounded-full"
              />
              <div className="text-primary-content">
                <p>1.2 SOL</p>
                <p>{shortAddress(publicKey?.toBase58())}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <a href="#item1">
              <Copy size={20} className="text-secondary" />
            </a>
            <a href="#item2">
              <Setting2 size={20} className="text-secondary" />
            </a>
            <a href="#item3">
              <Logout size={20} className="text-secondary" />
            </a>
          </div>
        </div>
        <p className="text-primary-content text-[30px] font-bold">$222</p>
      </div>
      <div className="border-t p-6">
        <p className="text-primary-content">Swap history</p>
        <SwapTransaction />
        <SwapTransaction />
        <SwapTransaction />
        <SwapTransaction />
      </div>
    </>
  );
};

export default SwapHistory;
