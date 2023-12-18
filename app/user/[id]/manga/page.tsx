import CustomButton from "@/app/components/CustomButton";
import { EmptyArraySection } from "@/app/components/EmptyArraySection";
import Navigation from "@/app/components/Navbar/Navigation";
import PublicTierCard from "@/app/components/TierCard/PublicTierCard";
import Title from "@/app/components/Title";
import { CombinedDataType } from "@/app/global";
import { tierToNumber } from "@/app/lib/ranks";
import { createServerSupabaseClient } from "@/app/lib/supabaseServer";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
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

  let {
    data: profile,
    error,
    status,
  } = await supabase.from("profile").select("*").eq("id", userId).single();

  const { data: userMangaIds } = await supabase
    .from("user_manga")
    .select("manga_id")
    .eq("user_id", session?.user.id!);

  const mangaIds = userMangaIds?.map((entry) => entry.manga_id) || [];

  // Тепер отримуємо список аніме на основі цих IDs
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
      {profile && (session?.user.id === profile.id || !profile.private) ? (
        <>
          <div className="flex justify-between items-center px-10 pt-5">
            <Title wrapped text={`${profile?.nickname}'s manga list`} />
            <Link href={`/user/${userId}`}>
              <Button color="primary">Go back</Button>
            </Link>
          </div>
          <div className="flex flex-col gap-4 my-8 mx-48 max-lg:mx-2">
            {combinedData && combinedData.length === 0 ? (
              <EmptyArraySection
                linkTo={`/user/${userId}`}
                emptyTitle="User doesn't have list yet."
                emptySubtitle="Go back"
                icon={<ArrowUturnLeftIcon width={60} height={60} />}
              />
            ) : (
              combinedData?.map((item: CombinedDataType) => (
                <div className="max-lg:px-[5%] max-lg:gap-5" key={item.id}>
                  <PublicTierCard item={item} isMobile={isMobile} />
                </div>
              ))
            )}
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
