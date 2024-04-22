import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Fragment } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hello page",
  description: "From Hello page",
};

export default function LayoutHello({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Fragment>{children}</Fragment>;
}
