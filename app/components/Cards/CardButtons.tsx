"use client";

import React from "react";
import AddButton from "../AddButton";
import CheckButton from "../CheckButton";
import { mohaveFont } from "@/app/lib/fonts";
import { JikanAnimeData } from "@/app/types/jikanAPITypes";

type Props = {
  existingIds: boolean;
  item: JikanAnimeData;
};

export default function CardButtons({ existingIds, item }: Props) {
  return (
    <>
      <div
        className={`relative z-10 flex flex-col justify-center gap-5 items-center h-full opacity-0 transition-opacity duration-300 hover:opacity-100 max-lg:hidden`}
      >
        {!existingIds ? <AddButton item={item} /> : <CheckButton item={item} />}
        <h2
          className={`text-4xl max-md:text-lg cursor-default ${mohaveFont.className}`}
        >
          {item.title}
        </h2>
      </div>
    </>
  );
}
