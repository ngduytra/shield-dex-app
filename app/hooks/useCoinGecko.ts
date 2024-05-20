import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback } from "react";

export function useTokenPriceCGKById({ id }: { id: string }) {
  const { connection } = useConnection();

  return useQuery({
    queryKey: ["get-token-price-cgk", { endpoint: connection.rpcEndpoint, id }],
    enabled: !!id,
    queryFn: () =>
      axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`,
        { headers: { "x-cg-demo-api-key": "CG-bbJyjnmQ9vr1iqK9cH1LiHEf" } }
      ),
  });
}

export function useGetTokenPriceCGKById() {
  const getTokenPriceCGK = (id: string) => {
    return axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`,
      { headers: { "x-cg-demo-api-key": "CG-bbJyjnmQ9vr1iqK9cH1LiHEf" } }
    );
  };

  return { getTokenPriceCGK };
}

export function useGetTokenPriceCGKByAddress() {
  const getTokenPriceCGK = (address: string) => {
    return axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=${address}&vs_currencies=usd`,
      { headers: { "x-cg-demo-api-key": "CG-bbJyjnmQ9vr1iqK9cH1LiHEf" } }
    );
  };

  return { getTokenPriceCGK };
}
