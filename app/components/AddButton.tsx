"use client";

import { addAnimeToFav } from "@/actions/add-anime-to-fav";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import CardSelectRank from "./Cards/CardSelectRank";
import { usePathname } from "next/navigation";
import { addMangaToFav } from "@/actions/add-manga-to-fav";
import { JikanAnimeData } from "../types/jikanAPITypes";

const tickVariants = {
  pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.85 : 0.2 }),
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
};

type Props = {
  item: JikanAnimeData;
};

const AddButton = ({ item }: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);
  const [lastCallTime, setLastCallTime] = useState(0);
  const [tier, setTier] = useState<TierEnum | null>(null);

  const pathname = usePathname();
  const isAnimePage = pathname?.startsWith("/anime");

  const title = item.title as string | null;
  const image_url = item.images.jpg.large_image_url as string | null;
  const title_id = item.mal_id as number;

  const handleAdd = async () => {
    const currentTime = Date.now();
    if (currentTime - lastCallTime >= 1000) {
      if (isAnimePage) {
        const response = await addAnimeToFav({
          title_id,
          title,
          image_url,
          tier,
        })
          .then((val) => {
            toast.success(val?.message);
          })
          .catch((error) => toast.error(error));
      } else {
        const response = await addMangaToFav({
          title_id,
          title,
          image_url,
          tier,
        })
          .then((val) => {
            val?.status === 201
              ? toast.success(val?.message)
              : toast.error(val?.error);
          })
          .catch((error) => toast.error(error));
      }
      setLastCallTime(currentTime);
    } else {
      toast.message("Don't spam!");
    }
  };

  return (
    <>
      <CardSelectRank setRank={setTier} />
      <AnimatePresence>
        <motion.svg
          key={title_id}
          initial={false}
          animate={isChecked ? "checked" : "unchecked"}
          width="140"
          height="140"
          viewBox="0 0 440 440"
          className="focus:border-none outline-none"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          onClick={() => {
            if (!isChecked) {
              setIsChecked(true);
            }
            handleAdd();
          }}
        >
          <motion.circle
            cx={220}
            cy={220}
            r={170}
            fill="transparent"
            strokeWidth="50"
            stroke="#FF008C"
            transition={{ duration: 0.5 }}
          />

          <motion.line
            x1="220"
            y1="170"
            x2="220"
            y2="270"
            stroke="white"
            strokeWidth="10"
            transition={{ duration: 0.5 }}
          />

          <motion.line
            x1="170"
            y1="220"
            x2="270"
            y2="220"
            stroke="white"
            strokeWidth="10"
            transition={{ duration: 0.5 }}
          />

          <motion.path
            d="M 0 128.666 L 128.658 257.373 L 341.808 0"
            transform="translate(54.917 88.332) rotate(-4 170.904 128.687)"
            fill="transparent"
            strokeWidth="65"
            stroke="hsl(0, 0%, 100%)"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={tickVariants}
            style={{ pathLength, opacity }}
          />
        </motion.svg>
      </AnimatePresence>
    </>
  );
};

export default AddButton;
