import { Metadata } from "next";
import React, { Fragment } from "react";

export const metadata: Metadata = {
  title: "Swap page",
  description: "From Swap page",
};

export default function layoutSwap({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex justify-center flex-row">{children}</div>;
}
