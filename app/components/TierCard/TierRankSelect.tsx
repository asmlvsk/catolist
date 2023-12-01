"use client";
import { updateAnime } from "@/actions/update-anime-in-fav";
import { updateManga } from "@/actions/update-manga-in-fav";
import { CombinedDataType } from "@/app/global";
import { ranks } from "@/app/lib/ranks";
import { createSupabaseClient } from "@/app/lib/supabaseClient";
import { createServerSupabaseClient } from "@/app/lib/supabaseServer";
import { Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TierRankSelect({ item }: { item: CombinedDataType }) {
  const [tier, setTier] = useState<string>(item?.tier || "");
  const item_id = item.id;
  const router = useRouter();
  const pathname = usePathname();
  const isAnimePage = pathname?.startsWith("/mylist/anime");
  const supabase = createSupabaseClient();
  useEffect(() => {
    const channel = supabase
      .channel("anime changes")
      .on(
        // @ts-ignore
        "postgres_changes",
        {
          event: "*",
          shema: "public",
          table: "user_anime",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateTier = async (tier: TierEnum) => {
    if (isAnimePage) {
      updateAnime({ item_id, tier }).then((val) => {
        val?.status === 200
          ? toast.success(val?.message)
          : toast.error(val?.error);
      });
    } else {
      updateManga({ item_id, tier }).then((val) => {
        val?.status === 200
          ? toast.success(val?.message)
          : toast.error(val?.error);
      });
    }
  };

  const handleChangeTier = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTier(e.target.value);
    updateTier(e.target.value as TierEnum);
  };
  return (
    <Select
      variant="bordered"
      classNames={{ innerWrapper: "p-0" }}
      onChange={handleChangeTier}
      selectedKeys={[tier]}
      aria-label="rank"
    >
      {ranks.map((rank) => (
        <SelectItem
          key={rank.value}
          value={rank.value}
          classNames={{ selectedIcon: "hidden", base: "text-center" }}
        >
          {rank.value}
        </SelectItem>
      ))}
    </Select>
  );
}
