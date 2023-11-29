import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import CustomPagination from "../components/Pagination";
import SearchAnime from "../components/Search/SearchInput";
import { supabase } from "../lib/supabaseServer";
import Navigation from "../components/Navbar/Navigation";
import CardItem from "../components/Cards/CardItem";
import {
  JikanAnime,
  JikanAnimeData,
  JikanPagination,
} from "../types/jikanAPITypes";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function page({ searchParams }: Props) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "12";

  const animeURL = !searchParams.search
    ? `https://api.jikan.moe/v4/top/anime?page=${page}&limit=${per_page}`
    : `https://api.jikan.moe/v4/anime?page=${page}&q=${searchParams.search}&limit=${per_page}`;

  async function getAnime() {
    const response = await fetch(animeURL, {
      next: { revalidate: 30 },
    });
    const data = await response.json();

    return data;
  }

  const animeList: { data: JikanAnimeData[]; pagination: JikanPagination } =
    await getAnime();

  const { data: userData } = await supabase
    .from("user_anime")
    .select("anime_id")
    .eq("user_id", session?.user.id!);

  const animeIds = userData?.map((entry) => entry.anime_id) || [];
  return (
    <>
      <Navigation session={session} />
      <div className="flex justify-center flex-col items-center gap-10 w-full">
        <SearchAnime />
        {animeList.data.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-center gap-5">
              {animeList.data?.map(
                (anime: JikanAnimeData) =>
                  animeIds && (
                    <CardItem
                      key={anime.mal_id}
                      item={anime}
                      itemIds={animeIds}
                    />
                  )
              )}
            </div>
            <div className="mb-10">
              <CustomPagination list={animeList} />
            </div>
          </>
        ) : (
          <>
            <p>There is no anime with this name 😔</p>
          </>
        )}
      </div>
    </>
  );
}
