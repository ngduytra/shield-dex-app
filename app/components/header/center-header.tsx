"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export default function CenterHeader() {
  const pathName = usePathname();

  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal p-1 bg-[--neutral-reverse] rounded-3xl">
        <li
          className="hover:bg-[--bg-header] rounded-3xl"
          style={{
            backgroundColor: pathName === "/swap" ? "var(--bg-header)" : "",
          }}
        >
          <Link href={"/swap"}>Swap</Link>
        </li>
        <li
          className="hover:bg-[--bg-header] rounded-3xl"
          style={{
            backgroundColor: pathName === "/pool" ? "var(--bg-header)" : "",
          }}
        >
          <Link href={"/pool"}>Pool</Link>
        </li>
      </ul>
    </div>
  );
}
