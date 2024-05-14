import PoolTable from "@/components/pool/PoolTable";
import TVL from "@/components/pool/tvl";
import { DollarSquare, Chart } from "iconsax-react";
import React from "react";

export default function PagePool() {
  return (
    <div className="container w-screen pt-10">
      <TVL />
      <PoolTable />
    </div>
  );
}
