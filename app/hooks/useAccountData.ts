import { useCallback, useMemo } from "react";
import { useAnchorProvider } from "@/solana/solana-provider";
import { utils } from "@coral-xyz/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";

export function useTokenAccountBalance(address: string) {
  const provider = useAnchorProvider();
  const { connection } = useConnection();

  const ataToken = useMemo(() => {
    if (!provider.publicKey || !address) return;
    return utils.token.associatedAddress({
      owner: provider.publicKey,
      mint: new PublicKey(address),
    });
  }, [address, provider.publicKey]);

  return useQuery({
    queryKey: [
      "get-token-balance",
      { endpoint: connection.rpcEndpoint, ataToken },
    ],
    enabled: !!ataToken,
    queryFn: () =>
      connection.getTokenAccountBalance(ataToken || new PublicKey(0)),
  });
}

export function useNativeBalance(userAddress: string) {
  const { connection } = useConnection();

  return useQuery({
    queryKey: ["get-token-balance", { endpoint: connection.rpcEndpoint }],
    queryFn: () => connection.getBalance(new PublicKey(userAddress)),
  });
}

export function useGetTokenAccountBalance() {
  const { connection } = useConnection();

  const getTokenBalanceAddress = useCallback(
    async (ataToken: PublicKey) => {
      return await connection.getTokenAccountBalance(ataToken);
    },
    [connection]
  );

  return { getTokenBalanceAddress };
}

export function useCompareWithBalance() {
  const { connection } = useConnection();

  const getTokenBalanceAddress = useCallback(
    async (address: PublicKey) => {
      return await connection.getTokenAccountBalance(address);
    },
    [connection]
  );

  return { getTokenBalanceAddress };
}
