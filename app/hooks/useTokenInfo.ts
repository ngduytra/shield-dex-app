import { useAllMintMetadata, useMintStore } from "@/providers/mint.provider";
import { useCallback, useMemo } from "react";
import { keccak_256 } from "@noble/hashes/sha3";
import BN from "bn.js";
import { v4 as uuid } from "uuid";
import { getUnknownToken } from "@/helpers";

export function useTokenInfo(address: string) {
  const metadata = useMintStore(({ metadata }) => Object.values(metadata));
  return useMemo(() => {
    const tokenInfo = metadata.find((token) => token.address === address);
    if (!tokenInfo) return getUnknownToken(address);
    return tokenInfo;
  }, [address, metadata]);
}

export function useGetTokenInfo() {
  const metadata = useMintStore(({ metadata }) => Object.values(metadata));
  const getTokenInfo = useCallback(
    (address: string) => {
      const tokenInfo = metadata.find((token) => token.address === address);
      if (!tokenInfo) return getUnknownToken(address);
      return tokenInfo;
    },
    [metadata]
  );
  return { getTokenInfo };
}

export const useRandomMintMetadata = ({
  seed = "",
  limit = 50,
}: {
  seed?: string;
  limit?: number;
} = {}): MintMetadata[] => {
  const metadata = useAllMintMetadata();
  const _seed = useMemo(
    () => keccak_256(new TextEncoder().encode(seed || uuid())),
    [seed]
  );
  const _limit = useMemo(() => Math.max(1, limit), [limit]);
  const randTokens = useMemo(() => {
    if (metadata.length < _limit) return metadata;
    const red = BN.red(new BN(metadata.length));
    const index = new BN(_seed).toRed(red).toNumber();
    return metadata.slice(index, index + _limit);
  }, [metadata, _limit, _seed]);
  return randTokens;
};
