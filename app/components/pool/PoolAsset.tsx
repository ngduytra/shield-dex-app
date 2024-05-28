import React, { useCallback, useEffect, useState } from "react";
import { PoolData } from "@/constants";
import { useGetTokenAccountBalance } from "@/hooks/useAccountData";
import { utils, web3 } from "@coral-xyz/anchor";
import { programId } from "@/program";
import { useTokenInfo } from "@/hooks/useTokenInfo";

type YourLiquidityProps = {
  poolAddress: web3.PublicKey;
  poolData: PoolData;
};

export default function PoolAsset({
  poolAddress,
  poolData,
}: YourLiquidityProps) {
  const { getTokenBalanceAddress } = useGetTokenAccountBalance();
  const tokenAInfo = useTokenInfo(poolData.mintA.toBase58());
  const tokenBInfo = useTokenInfo(poolData.mintB.toBase58());
  const [balanceA, setBalanceA] = useState(0);
  const [balanceB, setBalanceB] = useState(0);

  const getTokenBalance = useCallback(async () => {
    const [escrow] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("escrow"), poolAddress.toBuffer()],
      programId
    );
    const treasuryA = utils.token.associatedAddress({
      mint: poolData.mintA,
      owner: escrow,
    });
    const treasuryB = utils.token.associatedAddress({
      mint: poolData.mintA,
      owner: escrow,
    });

    const treasuryABalance = await getTokenBalanceAddress(treasuryA);

    const treasuryBBalance = await getTokenBalanceAddress(treasuryB);
    setBalanceA(treasuryABalance.value.uiAmount || 0);
    setBalanceB(treasuryBBalance.value.uiAmount || 0);
  }, [getTokenBalanceAddress, poolAddress, poolData.mintA]);

  useEffect(() => {
    getTokenBalance();
  }, [getTokenBalance]);

  return (
    <div className="col-span-1">
      <p className="text-[#6E7271] text-[14px] mb-1">Assets pooled</p>
      <p>
        {balanceA.toFixed(2)} {tokenAInfo.symbol}
      </p>
      <p>
        {balanceB.toFixed(2)} {tokenBInfo.symbol}
      </p>
    </div>
  );
}
