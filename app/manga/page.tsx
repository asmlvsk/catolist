import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import CustomPagination from "../components/Pagination";
import SearchAnime from "../components/Search/SearchInput";
import { supabase } from "../lib/supabaseServer";
import Navigation from "../components/Navbar/Navigation";
import CardItem from "../components/Cards/CardItem";
import { JikanAnimeData, JikanPagination } from "../types/jikanAPITypes";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "12";

  const mangaURL = !searchParams.search
    ? `https://api.jikan.moe/v4/top/manga?page=${page}&limit=${per_page}`
    : `https://api.jikan.moe/v4/manga?page=${page}&q=${searchParams.search}&limit=${per_page}`;

  async function getManga() {
    const response = await fetch(mangaURL, {
      next: { revalidate: 30 },
    });
    const data = await response.json();

    return data;
  }

  const mangaList: { data: JikanAnimeData[]; pagination: JikanPagination } =
    await getManga();

  const { data: userData } = await supabase
    .from("user_manga")
    .select("manga_id")
    .eq("user_id", session?.user.id!);

  const mangaIds = userData?.map((entry) => entry.manga_id) || [];

  return (
    <>
      <Navigation session={session} />
      <div className="flex justify-center flex-col items-center gap-10">
        <SearchAnime />
        {mangaList.data.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-center gap-5">
              {mangaList.data?.map(
                (manga: JikanAnimeData) =>
                  mangaIds && (
                    <CardItem
                      key={manga.mal_id}
                      item={manga}
                      itemIds={mangaIds}
                    />
                  )
              )}
            </div>
            <div className="mb-10">
              <CustomPagination list={mangaList} />
            </div>
          </>
        ) : (
          <>
            <p>There is no manga with this name 😔</p>
          </>
        )}
      </div>
    </>
  );
}
