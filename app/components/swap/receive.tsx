import React from "react";

import TokenSelection from "../token-selection";

export default function Receive() {
  return (
    <div className="bg-[--bg-card] p-4 rounded-2xl flex justify-between">
      <div className=" space-y-3">
        <div>
          <span>You will receive</span>
        </div>
        <div>
          <p className="text-2xl font-bold">2,867,266.5</p>
          <p className="text-[--disabled-color] text-sm">$1,942.5</p>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-secondary text-sm">Balance: 12837810.5</p>
        </div>
        <div className="flex justify-end">
          <TokenSelection classNames="w-28" />
        </div>
      </div>
    </div>
  );
}
