import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useTokenPriceCGK({ id }: { id: string }) {
  const { connection } = useConnection();

  return useQuery({
    queryKey: ["get-token-price-cgk", { endpoint: connection.rpcEndpoint, id }],
    queryFn: () =>
      axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`,
        { headers: { "x-cg-demo-api-key": "CG-bbJyjnmQ9vr1iqK9cH1LiHEf" } }
      ),
  });
}
