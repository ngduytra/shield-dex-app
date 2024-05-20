"use client";
import PoolTable from "@/components/pool/PoolTable";
import TVL from "@/components/pool/tvl";
import { useShieldDexUiProgram } from "@/hooks/useShieldDexProgram";
import { DollarSquare, Chart } from "iconsax-react";
import React, { useEffect } from "react";

export default function PagePool() {
  const {
    fetchPool,
    initialize,
    fetchPlatformConfig,
    createPlatformConfig,
    swap,
  } = useShieldDexUiProgram();
  useEffect(() => {
    if (fetchPool.data)
      for (const pool of fetchPool.data) {
        console.log(pool);
      }
  }, [fetchPool.data]);

  return (
    <div className="container w-screen pt-10">
      <TVL />
      <PoolTable />
    </div>
  );
}
