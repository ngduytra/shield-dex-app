"use client";

import UserWalletModal from "./components/user/wallet-modal";
import { useRouter } from "next/navigation";
import { WalletButton } from "./solana/solana-provider";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/swap");
  }, [router]);

  return (
    <div>
      <UserWalletModal />
      <WalletButton />
    </div>
  );
}
