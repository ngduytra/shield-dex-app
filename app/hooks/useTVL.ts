import { utils, web3 } from "@coral-xyz/anchor";

import { useQuery } from "@tanstack/react-query";

import { useCluster } from "../cluster/cluster-data-access";

import { useShieldDexUiProgram } from "./useShieldDexProgram";
import { useGetTokenPriceCGKByAddress } from "./useCoinGecko";
import { useGetTokenAccountBalance } from "./useAccountData";

export const useTVL = () => {
  const { program } = useShieldDexUiProgram();
  const { cluster } = useCluster();
  const { getTokenPriceCGK } = useGetTokenPriceCGKByAddress();
  const { getTokenBalanceAddress } = useGetTokenAccountBalance();
  return useQuery({
    queryKey: ["fetch-tvl", { cluster }],
    queryFn: async () => {
      const pools = await program.account.pool.all();
      const poolValues = await Promise.all(
        pools.map(async (pool) => {
          const [escrowPool] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from("escrow"), pool.publicKey.toBuffer()],
            program.programId
          );
          const treasuryA = utils.token.associatedAddress({
            owner: escrowPool,
            mint: pool.account.mintA,
          });
          const priceA: any = await getTokenPriceCGK(
            pool.account.mintA.toBase58()
          );
          const tokenAmountA = await getTokenBalanceAddress(treasuryA);
          return !!priceA[pool.account.mintA.toBase58()]
            ? priceA[pool.account.mintA.toBase58()] *
                (tokenAmountA.value.uiAmount || 0)
            : 0;
        })
      );
      return poolValues.reduce((total, num) => total + num, 0);
    },
  });
};
