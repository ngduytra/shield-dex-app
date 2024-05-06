import React from "react";

import Swap from "@/components/swap";
import MarketInfo from "@/components/market-info";

export default function PageSwap() {
  return (
    <div className="py-14 justify-between space-y-8">
      <Swap />
      <MarketInfo />
    </div>
  );
}
