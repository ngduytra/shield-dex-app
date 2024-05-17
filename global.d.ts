type MintMetadata = {
  address: string;
  chainId: ChainId;
  decimals: number;
  name: string;
  symbol: string;
  logoURI: string;
  tags: string[];
  extensions: {
    coingeckoId?: string;
  };
};
