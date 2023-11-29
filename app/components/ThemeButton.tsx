"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

type Props = {
  text?: string;
};

const ThemeButton = ({ text }: Props) => {
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-700"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <>
          <SunIcon className="h-5 w-5 text-orange-300" />{" "}
          <p className="ml-2">{text}</p>
        </>
      ) : (
        <>
          <MoonIcon className="h-5 w-5 text-slate-800" />{" "}
          <p className="ml-2">{text}</p>
        </>
      )}
    </button>
  );
};

export default ThemeButton;
