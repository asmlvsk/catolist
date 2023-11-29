import React from "react";
import Navigation from "@/app/components/Navbar/Navigation";
import { tierToNumber } from "@/app/lib/ranks";
import { CombinedDataType } from "@/app/global";
import { DataList } from "../DataList";
import { createServerSupabaseClient } from "@/app/lib/supabaseServer";

type Props = {};

export default async function MyList({}: Props) {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: userMangaIds } = await supabase
    .from("user_manga")
    .select("manga_id")
    .eq("user_id", session?.user.id!);

  const mangaIds = userMangaIds?.map((entry) => entry.manga_id) || [];

  const { data: mangaData } = await supabase
    .from("manga")
    .select("*")
    .in("title_id", mangaIds);

  const { data: userManga } = await supabase
    .from("user_manga")
    .select("*")
    .order("tier", { ascending: false })
    .eq("user_id", session?.user.id!);

  const combinedData: CombinedDataType[] | undefined = mangaData
    ?.map((manga) => {
      const mangaData = userManga?.find(
        (review) => review.manga_id === manga.title_id
      );
      return {
        ...manga,
        id: mangaData?.id,
        review_text: mangaData?.review_text || null,
        tier: mangaData?.tier || null,
      };
    })
    .sort((a, b) => {
      return tierToNumber(b.tier) - tierToNumber(a.tier);
    });

  return (
    <>
      <Navigation session={session} />
      <DataList data={combinedData} infoType="manga" />
    </>
  );
}
