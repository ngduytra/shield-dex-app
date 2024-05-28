"use client";
import {
  useGetTokenAccountBalance,
  useTokenAccountBalance,
} from "@/hooks/useAccountData";
import { programId } from "@/program";
import { utils, web3 } from "@coral-xyz/anchor";
import React, { useCallback, useEffect, useMemo, useState } from "react";

type YourShareProps = {
  lpAddress: web3.PublicKey;
  poolAddress: web3.PublicKey;
};
export default function YourShare({ poolAddress, lpAddress }: YourShareProps) {
  const { getTokenBalanceAddress } = useGetTokenAccountBalance();
  const lpBalance = useTokenAccountBalance(lpAddress?.toBase58());
  const [totalLp, setTotalLp] = useState(0);

  // const getTotalLp = useCallback(async () => {
  //   const [escrow] = web3.PublicKey.findProgramAddressSync(
  //     [Buffer.from("escrow"), poolAddress.toBuffer()],
  //     programId
  //   );
  //   const treasuryLp = utils.token.associatedAddress({
  //     mint: lpAddress,
  //     owner: escrow,
  //   });
  //   const treasuryLpBalance = await getTokenBalanceAddress(treasuryLp);
  //   setTotalLp(treasuryLpBalance.value.uiAmount || 0);
  // }, [getTokenBalanceAddress, lpAddress, poolAddress]);

  const share = useMemo(() => {
    if (!lpBalance.data) return 0;
    return (Number(lpBalance.data?.value?.uiAmount || 0) * 100) / totalLp;
  }, [lpBalance.data, totalLp]);

  // useEffect(() => {
  //   getTotalLp();
  // }, [getTotalLp]);

  return (
    <div className="col-span-1">
      <p className="text-[#6E7271] text-[14px] mb-1">Your shared</p>
      <p> ___</p>
    </div>
  );
}
