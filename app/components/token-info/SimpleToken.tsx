import React from "react";
import Image from "next/image";

import { useTokenInfo } from "@/hooks/useTokenInfo";

type SimpleTokenProps = {
  tokenAddress: string;
};

export default function SimpleToken({ tokenAddress }: SimpleTokenProps) {
  const token = useTokenInfo(tokenAddress);

  return (
    <div className="px-2 py-3 rounded-[30px] bg-[--bg-header] flex items-center gap-2">
      <Image
        src={token?.logoURI || ""}
        width={24}
        height={24}
        alt="token"
        className="rounded-full bg-black"
      />
      <p>{token?.symbol || "UKWN"}</p>
    </div>
  );
}
