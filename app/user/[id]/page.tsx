import CustomButton from "@/app/components/CustomButton";
import Navigation from "@/app/components/Navbar/Navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import animeImg from "../../../public/anime_choose.png";
import mangaImg from "../../../public/manga_choose.jpg";
import Title from "@/app/components/Title";
import { mohaveFont } from "@/app/lib/fonts";

export default async function UserAnime({
  params: { id },
}: {
  params: { id: string };
}) {
  const userId = id;

  const supabase = createServerComponentClient<Database>({ cookies });

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
          <div className="flex gap-8 justify-center pt-10 flex-col items-center">
            <Title text={`${profile?.nickname}'s lists`} />
            <div className="flex gap-5 max-md:flex-col">
              <Link href={`/user/${userId}/anime`}>
                <div className="h-[450px] w-[450px] relative border rounded-3xl items-center justify-center text-center flex max-lg:h-[350px] max-lg:w-[350px]">
                  <Image
                    src={animeImg}
                    alt="My anime list"
                    fill
                    style={{ objectFit: "contain" }}
                    className="brightness-50"
                  />
                  <h2 className={`text-4xl z-30 ${mohaveFont.className}`}>
                    Anime library
                  </h2>
                </div>
              </Link>
              <Link href={`/user/${userId}/manga`}>
                <div className="h-[450px] w-[450px] relative border rounded-3xl items-center justify-center text-center flex max-lg:h-[350px] max-lg:w-[350px]">
                  <Image
                    src={mangaImg}
                    alt="My manga list"
                    fill
                    style={{ objectFit: "contain" }}
                    className="brightness-50"
                  />
                  <h2 className={`text-4xl z-30 ${mohaveFont.className}`}>
                    Manga library
                  </h2>
                </div>
              </Link>
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
