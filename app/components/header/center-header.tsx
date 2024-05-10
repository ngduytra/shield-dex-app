"use client";
import { classNames } from "@/utils/string";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export default function CenterHeader() {
  const pathName = usePathname();
  console.log(pathName);
  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal p-1 bg-[--neutral-reverse] rounded-3xl">
        <li
          className={classNames(
            "hover:bg-[--bg-header] rounded-3xl",
            pathName === "/swap"
              ? "bg-[--bg-header] text-[--label-active]"
              : "text-[--disabled-color]"
          )}
        >
          <Link href={"/swap"}>Swap</Link>
        </li>
        <li
          className={classNames(
            "hover:bg-[--bg-header] rounded-3xl",
            pathName === "/pool"
              ? "bg-[--bg-header] text-[--label-active]"
              : "text-[--disabled-color]"
          )}
        >
          <Link href={"/pool"}>Pool</Link>
        </li>
      </ul>
    </div>
  );
}
