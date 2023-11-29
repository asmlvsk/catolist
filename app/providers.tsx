"use client";

import { ThemeProvider } from "next-themes";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
      <ThemeProvider attribute="class" defaultTheme="system">
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
};
