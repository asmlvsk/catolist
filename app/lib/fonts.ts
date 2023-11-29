import { Josefin_Sans, Mohave } from "next/font/google";

export const mohaveFont = Mohave({
  weight: "600",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-mohave",
  display: "swap",
});

export const josefin = Josefin_Sans({
  subsets: ["latin"],
});
