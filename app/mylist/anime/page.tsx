import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import Navigation from "@/app/components/Navbar/Navigation";
import { CombinedDataType } from "@/app/global";
import { tierToNumber } from "@/app/lib/ranks";
import { DataList } from "../DataList";

type Props = {};

export default async function MyList({}: Props) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: userData } = await supabase
    .from("user_anime")
    .select("anime_id")
    .eq("user_id", session?.user.id!);

  const animeIds = userData?.map((entry) => entry.anime_id) || [];

  // Тепер отримуємо список аніме на основі цих IDs
  const { data: animeData } = await supabase
    .from("anime")
    .select("*")
    .in("title_id", animeIds);

  const { data: animeReviews } = await supabase
    .from("user_anime")
    .select("*")
    .order("tier", { ascending: false })
    .eq("user_id", session?.user.id!);

  const combinedData: CombinedDataType[] | undefined = animeData
    ?.map((anime) => {
      const reviewForAnime = animeReviews?.find(
        (review) => review.anime_id === anime.title_id
      );
      return {
        ...anime,
        id: reviewForAnime?.id,
        review_text: reviewForAnime?.review_text || null,
        tier: reviewForAnime?.tier || null,
      };
    })
    .sort((a, b) => {
      return tierToNumber(b.tier) - tierToNumber(a.tier);
    });

  return (
    <>
      <Navigation session={session} />
      <DataList data={combinedData} infoType="anime" />
    </>
  );
}
