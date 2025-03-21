import { useConnection } from "@solana/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

export function useTokenPriceCGKByAddress(address: string) {
  return useQuery({
    queryKey: ["get-token-price-cgk", { address }],
    enabled: !!address,
    queryFn: () =>
      axios.get(
        `https://api.coingecko.com/api/v3/simple/token_price/solana?contract_addresses=${address}&vs_currencies=usd`,
        { headers: { "x-cg-demo-api-key": "CG-bbJyjnmQ9vr1iqK9cH1LiHEf" } }
      ),
  });
}
