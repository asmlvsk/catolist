"use client";

import { addAnimeToFav } from "@/actions/add-anime-to-fav";
import { addMangaToFav } from "@/actions/add-manga-to-fav";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { JikanAnimeData } from "../types/jikanAPITypes";

const tickVariants = {
  pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.85 : 0.2 }),
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
};

type Props = {
  item: JikanAnimeData;
};

const CheckButton = ({ item }: Props) => {
  const [lastCallTime, setLastCallTime] = useState(0);

  const title = item.title as string | null;
  const image_url = item.images.jpg.large_image_url as string | null;
  const title_id = item.mal_id as number;

  const pathname = usePathname();
  const isAnimePage = pathname?.startsWith("/anime");

  const handleAdd = async () => {
    const currentTime = Date.now();
    if (currentTime - lastCallTime >= 1000) {
      if (isAnimePage) {
        const response = await addAnimeToFav({
          title_id,
          title,
          image_url,
        }).then((val) => {
          val?.status === 200
            ? toast.success(val?.message)
            : toast.error(val?.error);
        });
      } else {
        const response = await addMangaToFav({
          title_id,
          title,
          image_url,
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
    <AnimatePresence>
      <motion.svg
        key={title_id}
        width="140"
        height="140"
        viewBox="0 0 440 440"
        className="focus:border-none outline-none"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        onClick={handleAdd}
      >
        <motion.path
          d="M 0 128.666 L 128.658 257.373 L 341.808 0"
          transform="translate(54.917 88.332) rotate(-4 170.904 128.687)"
          fill="transparent"
          strokeWidth="65"
          stroke="hsl(0, 0%, 100%)"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={tickVariants}
          //   custom={isChecked}
        />
      </motion.svg>
    </AnimatePresence>
  );
};

export default CheckButton;
