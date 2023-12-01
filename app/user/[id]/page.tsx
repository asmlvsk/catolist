import CustomButton from "@/app/components/CustomButton";
import Navigation from "@/app/components/Navbar/Navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import animeImg from "../../../public/anime_choose.png";
import mangaImg from "../../../public/manga_choose.jpg";
import Title from "@/app/components/Title";
import { mohaveFont } from "@/app/lib/fonts";
import { createServerSupabaseClient } from "@/app/lib/supabaseServer";
import ImageCard from "@/app/components/ImageCard";

export default async function UserAnime({
  params: { id },
}: {
  params: { id: string };
}) {
  const userId = id;

  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  let {
    data: profile,
    error,
    status,
  } = await supabase.from("profile").select("*").eq("id", userId).single();

  return (
    <>
      <Navigation session={session} />
      {profile && (session?.user.id === profile.id || !profile.private) ? (
        <>
          <div className="flex gap-8 justify-center pt-10 flex-col items-center text-center max-lg:pt-5 max-lg:pb-5">
            <Title text={`${profile?.nickname}'s lists`} />
            <div className="flex gap-5 max-md:flex-col">
              <ImageCard
                imageSrc={animeImg}
                title="Anime library"
                linkTo={`/user/${userId}/anime`}
              />
              <ImageCard
                imageSrc={mangaImg}
                title="Manga library"
                linkTo={`/user/${userId}/manga`}
              />
            </div>
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
