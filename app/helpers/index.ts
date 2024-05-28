export const getUnknownToken = (address: string) => {
  return {
    address,
    chainId: 101,
    decimals: 6,
    logoURI:
      "https://bafybeiaabr5avkgtf6w74yig2tf6lcka5f3oe7jdaakixuauvn34l6lo5e.ipfs.nftstorage.link",
    name: "UNKNOWN",
    symbol: "UNKNOWN",
    tags: ["unknown"],
    extensions: { coingeckoId: null },
  };
};
