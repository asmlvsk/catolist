import CustomButton from "@/app/components/CustomButton";
import Navigation from "@/app/components/Navbar/Navigation";
import PublicTierCard from "@/app/components/TierCard/PublicTierCard";
import Title from "@/app/components/Title";
import { CombinedDataType } from "@/app/global";
import { tierToNumber } from "@/app/lib/ranks";
import { createServerSupabaseClient } from "@/app/lib/supabaseServer";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";
import { getSelectorsByUserAgent } from "react-device-detect";

export default async function UserAnime({
  params: { id },
}: {
  params: { id: string };
}) {
  const userId = id;

  const { isMobile } = getSelectorsByUserAgent(
    headers().get("user-agent") ?? ""
  );

  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: userData } = await supabase
    .from("user_anime")
    .select("anime_id")
    .eq("user_id", id);

  let {
    data: profile,
    error,
    status,
  } = await supabase.from("profile").select("*").eq("id", userId).single();

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
    .eq("user_id", userId);

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
      {profile && (session?.user.id === profile.id || !profile.private) ? (
        <>
          <Title wrapped text={`${profile?.nickname}'s anime list`} />
          <div className="flex flex-col gap-4 my-8 mx-10 max-lg:mx-2">
            {combinedData?.map((item: CombinedDataType) => (
              <div className="max-lg:px-[5%] max-lg:gap-5" key={item.id}>
                <PublicTierCard item={item} isMobile={isMobile} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <section className="main flex justify-center items-center flex-col gap-4">
          Profile is private.
          {!session && (
            <Link href="/">
              <CustomButton title="You can create your own list here!" />
            </Link>
          )}
        </section>
      )}
    </>
  );
}
