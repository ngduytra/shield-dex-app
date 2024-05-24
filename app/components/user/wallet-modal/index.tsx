import Image from "next/image";
import SolanaLogo from "@/assets/images/phantomwallet_logo.png";
import { useWallet } from "@solana/wallet-adapter-react";
import { shortAddress } from "@/utils/string";
import { Copy, Logout, Setting2 } from "iconsax-react";
import SwapHistory from "./SwapHistory";
import Settings from "./Settings";

const UserWalletModal = () => {
  const { publicKey } = useWallet();

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu min-h-full p-0 text-base-conten bg-[--bg-header] w-[442px]">
          {/* Sidebar content here */}

          <div className="carousel w-full h-full">
            <div id="item1" className="carousel-item w-full flex-col">
              <SwapHistory />
            </div>
            <div id="item2" className="carousel-item w-full flex-col">
              <Settings />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWalletModal;
