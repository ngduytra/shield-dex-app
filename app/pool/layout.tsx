import { Metadata } from "next";
import React, { Fragment } from "react";

export const metadata: Metadata = {
  title: "Pool page",
  description: "From Hello page",
};

export default function LayoutPool({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Fragment>{children}</Fragment>;
}
