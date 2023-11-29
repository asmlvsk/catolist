import React from "react";
import { mohaveFont } from "../lib/fonts";

type Props = {
  text: string;
  textSize?: string;
  wrapped?: boolean;
};

export default function Title({ text, textSize = "text-6xl", wrapped }: Props) {
  return (
    <h1
      className={`${textSize} w-full pt-5 px-5 ${
        !wrapped
          ? "overflow-ellipsis whitespace-nowrap overflow-hidden"
          : "break-words"
      } ${mohaveFont.className}`}
    >
      {text}
    </h1>
  );
}
