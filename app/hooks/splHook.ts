import { isAddress } from "@/helpers/utils";
import { useAnchorProvider } from "@/solana/solana-provider";
import { splTokenProgram } from "@coral-xyz/spl-token";
import { useCallback, useMemo } from "react";
import useSWR from "swr";

/**
 * Create an SPL instance
 * @returns SPL instance
 */
export const useSpl = () => {
  const provider = useAnchorProvider();
  const spl = useMemo(() => splTokenProgram({ provider }), [provider]);
  return spl;
};

export const useMints = (mintAddresses: string[]) => {
  const spl = useSpl();
  const fetcher: any = useCallback(
    async ([mintAddresses]: [string[]]) => {
      for (const mintAddress of mintAddresses)
        if (!isAddress(mintAddress)) return undefined;
      const data = await Promise.all(
        mintAddresses.map(
          async (mintAddress) => await spl.account.mint.fetch(mintAddress)
        )
      );
      return data;
    },
    [spl]
  );
  const { data } = useSWR([mintAddresses, "spl"], fetcher);

  return data || [];
};
