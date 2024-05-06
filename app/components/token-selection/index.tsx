"use client";
import React, { useState } from "react";

import Image from "next/image";
import SolIcon from "@/assets/images/sol-icon.png";

export default function TokenSelection() {
  const [selectedToken, setSelectedToken] = useState("");
  const tokens = ["Sol", "Han Solo", "Greedo"];

  console.log("token", selectedToken);
  return (
    <select
      className="select [--rounded-btn:1.5rem] border-[--stroke-default]  [--fallback-bc:red] w-28"
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
