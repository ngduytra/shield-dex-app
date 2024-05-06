"use client";
import { Fragment, ReactNode, useEffect } from "react";
import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

import { env } from "@/configs/env";
import Header from "@/components/header/index";

const autoTheme = (): Theme => {
  if (window.matchMedia("(prefers-color-scheme: light)").matches)
    return "light";
  return "dark";
};

/**
 * Store
 */

export type UiStore = {
  theme?: Theme;
  setTheme: (theme?: Theme) => void;
};

export const useUiStore = create<UiStore>()(
  devtools(
    persist(
      (set) => ({
        theme: "light",
        setTheme: (theme?: Theme) => set({ theme }, false, "setTheme"),
      }),
      {
        name: "ui",
        storage: createJSONStorage(() => localStorage),
      }
    ),
    {
      name: "ui",
      enabled: env === "development",
    }
  )
);

/**
 * Hook
 */

export const useTheme = () => {
  return useUiStore(({ theme, setTheme }) => ({
    theme: theme || autoTheme(),
    setTheme,
  }));
};
/**
 * Provider
 */

export default function UiProvider({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  // Listen theme events
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="flex justify-center flex-row">
      <div className="container p-4">
        <Header />
        <div className="flex justify-center flex-row">
          <div className="artboard phone-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
