import React from "react";
import animeImg from "../../public/anime_choose.png";
import mangaImg from "../../public/manga_choose.jpg";
import { Auth } from "../components/Auth/Auth";
import { createServerSupabaseClient } from "../lib/supabaseServer";
import ImageCard from "../components/ImageCard";

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
          <ImageCard
            imageSrc={animeImg}
            title="Anime library"
            linkTo="/anime"
          />
          <ImageCard
            imageSrc={mangaImg}
            title="Manga library"
            linkTo="/manga"
          />
        </div>
      )}
    </section>
  );
};

export default Landing;
