"use client";
import { useState } from "react";

import SolIcon from "@/assets/images/sol-icon.png";
import { classNames as cx } from "@/utils/string";
import Image from "next/image";

export default function TokenSelection({
  classNames = "",
}: {
  classNames?: string;
}) {
  const [selectedToken, setSelectedToken] = useState("");
  const tokens = ["Sol", "Han Solo", "Greedo"];

  return (
    <select
      className={cx(
        "select [--rounded-btn:1.5rem] border-[--stroke-default]  [--fallback-bc:red]",
        classNames
      )}
      onChange={(e) => setSelectedToken(e.target.value)}
    >
      {tokens.map((token) => (
        <option
          key={token}
          value={token}
          disabled={token === "Sol"}
          selected={token === "Sol"}
        >
          <div className="avatar">
            <div className="w-24 rounded-full">
              <Image
                src={SolIcon.src}
                alt="token-logo"
                width={24}
                height={24}
              />
            </div>
          </div>
          {token}
        </option>
      ))}
    </select>
  );
}
