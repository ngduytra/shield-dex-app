import React from "react";

import LeftHeader from "./left-header";
import CenterHeader from "./center-header";
import RightHeader from "./right-header";

export default function Header() {
  return (
    <div className="navbar bg-base-100 bg-[--bg-header] rounded-2xl">
      <LeftHeader />
      <CenterHeader />
      <RightHeader />
    </div>
  );
}
