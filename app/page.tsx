"use client";
import Image from "next/image";
import { useTheme } from "./providers/ui.provider";

export default function Home() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Switch
      </button>
      <div>
        <p className="text-[--card]">Test</p>
      </div>
    </div>
  );
}
