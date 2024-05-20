import { useCallback, useState } from "react";
import { useDebounce } from "react-use";
import { useSwapGlob } from "@/components/swap";
import { Route, useAllRoutes } from "./useSwapHook";

/** Get valid routes with bidAddress and askAddress
 *  @returns valid routes
 */

export const useRoutes = () => {
  const [availRoutes, setAvailRoutes] = useState<Route[][]>([]);
  const allRoutes = useAllRoutes();
  const { swapGlob, setSwapGlob } = useSwapGlob();
  //   const bidMintAddress = useSwapStore(({ bidMintAddress }) => bidMintAddress);
  //   const askMintAddress = useSwapStore(({ askMintAddress }) => askMintAddress);
  const isValidRoute = (route: Route[]) => {
    const pools = new Set();
    const mintPairs = new Set();

    for (const { pool, askMint, bidMint } of route) {
      // Check duplicate pools
      if (pools.has(pool)) return false;
      pools.add(pool);

      const mintPair = bidMint + "-" + askMint;
      const reverseMintPair = askMint + "-" + bidMint;
      // Check duplicate bidMint && askMint
      if (mintPairs.has(reverseMintPair)) return false;
      mintPairs.add(mintPair);
    }
    return true;
  };

  const getAvailRoutes = useCallback(
    async (bidMint: string, askMint: string, hop = 1) => {
      if (hop > 3) return [];
      const allWaitedRoutes = await allRoutes;

      const routesFromBid = allWaitedRoutes[bidMint];
      if (!routesFromBid) return [];

      const pools = routesFromBid[askMint] || [];
      const routes: Array<Route[]> = pools.map((pool) => {
        return [{ pool, bidMint, askMint }];
      });

      for (const nextMint in routesFromBid) {
        const nextPools = routesFromBid[nextMint];
        const nextHop = hop + 1;
        const nextRoutes = await getAvailRoutes(nextMint, askMint, nextHop);

        nextRoutes.forEach((route) => {
          nextPools.forEach((pool) => {
            const newRoute = [{ pool, bidMint, askMint: nextMint }, ...route];
            if (isValidRoute(newRoute)) routes.push(newRoute);
          });
        });
      }
      return routes;
    },

    [allRoutes]
  );

  useDebounce(
    async () => {
      const availRoutes = await getAvailRoutes(
        swapGlob.accounts.bidMint,
        swapGlob.accounts.askMint
      );
      setAvailRoutes(availRoutes);
    },
    300,
    []
  );

  return { availRoutes: availRoutes || [] };
};
