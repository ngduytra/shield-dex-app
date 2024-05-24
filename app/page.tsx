"use client";

import UserWalletModal from "./components/user/wallet-modal";
import { useTheme } from "./providers/ui.provider";
import { WalletButton } from "./solana/solana-provider";

export default function Home() {
  return (
    <div>
      <UserWalletModal />
      <div>
        <p className="text-[--card]">Test</p>
      </div>
      <WalletButton />
    </div>
  );
}
