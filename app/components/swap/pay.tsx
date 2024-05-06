import React from "react";

import TokenSelection from "../token-selection";

export default function Pay() {
  return (
    <div className="bg-[--bg-card] p-4 rounded-2xl flex justify-between">
      <div className=" space-y-3">
        <div>
          <span>You Pay</span>
        </div>
        <div>
          <p className="text-2xl font-bold">10.5</p>
          <p className="text-[--disabled-color] text-sm">$1,942.5</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-end">
          <p className="text-secondary text-sm">Balance: 10.5</p>
        </div>
        <div>
          <TokenSelection />
        </div>
      </div>
    </div>
  );
}
