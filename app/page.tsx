"use client";

import { useTheme } from "./providers/ui.provider";
import { WalletButton } from "./solana/solana-provider";

export default function Home() {
  return (
    <div>
     
      <div>
        <p className="text-[--card]">Test</p>
      </div>
      <WalletButton />
    </div>
  );
}
