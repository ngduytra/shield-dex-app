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
  return <Fragment>{children}</Fragment>;
}
