import React from "react";
import animeImg from "../../public/anime_choose.png";
import mangaImg from "../../public/manga_choose.jpg";
import Image from "next/image";
import Link from "next/link";
import { Auth } from "./Auth/Auth";
import { mohaveFont } from "../lib/fonts";
import { createServerSupabaseClient } from "../lib/supabaseServer";

const Landing = async () => {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <section className="main flex justify-center items-center flex-col gap-3 py-10">
      {!session ? (
        <>
          <h1 className="text-5xl">Your anime list.</h1>
          <h5 className="text-base">
            Create your own list and share it with friends.
          </h5>
          <Auth />
        </>
      ) : (
        <div className="flex gap-8 max-md:flex-col">
          <Link href={"/anime"}>
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
          <Link href={"/manga"}>
            <div className="h-[450px] w-[450px] relative border rounded-3xl items-center justify-center text-center flex max-lg:h-[350px] max-lg:w-[350px]">
              <Image
                src={mangaImg}
                alt="My manga list"
                fill
                style={{ objectFit: "contain" }}
                className="brightness-50 max-w-full h-auto"
              />
              <h2 className={`text-4xl z-30 ${mohaveFont.className}`}>
                Manga library
              </h2>
            </div>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Landing;
