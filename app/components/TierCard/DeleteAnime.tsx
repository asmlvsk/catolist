"use client";

import { deleteAnimeFromFav } from "@/actions/delete-anime-from-fav";
import { deleteMangaFromFav } from "@/actions/delete-manga-from-fav";
import { CombinedDataType } from "@/app/global";
import { tierColor } from "@/app/lib/tierColor";
import { TrashIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

export const DeleteAnime = ({ item }: { item: CombinedDataType }) => {
  const [lastCallTime, setLastCallTime] = useState(0);
  const itemId = item.id!;

  const pathname = usePathname();
  const isAnimePage = pathname?.startsWith("/mylist/anime");

  const handleDelete = async () => {
    const currentTime = Date.now();
    if (currentTime - lastCallTime >= 1000) {
      if (isAnimePage) {
        const response = await deleteAnimeFromFav({
          itemId,
        }).then((val) => {
          val?.status === 200
            ? toast.success(val?.message)
            : toast.error(val?.error);
        });
      } else {
        const response = await deleteMangaFromFav({
          itemId,
        }).then((val) => {
          val?.status === 200
            ? toast.success(val?.message)
            : toast.error(val?.error);
        });
      }

      setLastCallTime(currentTime);
    } else {
      toast.message("Don't spam!");
    }
  };

  return (
    <>
      <TrashIcon
        width={20}
        height={20}
        cursor="pointer"
        color={tierColor(item.tier)}
        onClick={handleDelete}
      />
      <Toaster richColors />
    </>
  );
};
