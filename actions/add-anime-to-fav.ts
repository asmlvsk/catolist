"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const addAnimeToFav = async ({
  title_id,
  title,
  image_url,
  tier,
}: MergedInsertAnimeManga) => {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!title || !image_url || !title_id) {
      return;
    }

    const { data: existingRecord } = await supabase
      .from("anime")
      .select("title_id")
      .eq("title_id", title_id)
      .limit(1);

    if (!existingRecord || existingRecord.length === 0) {
      const { error, status } = await supabase
        .from("anime")
        .insert([{ title, title_id: title_id, image_url: image_url }]);

      if (error) {
        return { error: error.message, status: status };
      }
    }

    const { data: existAnime, error: existAnimeError } = await supabase
      .from("user_anime")
      .select("*")
      .match({ user_id: session?.user.id, anime_id: title_id })
      .limit(1);

    if (!existAnime || existAnime.length === 0) {
      const { error, status, data } = await supabase
        .from("user_anime")
        .insert([
          { user_id: session?.user.id, anime_id: title_id, tier: tier },
        ]);

      if (error) {
        return {
          error: error.message,
          status: status,
        };
      }
    } else {
      return {
        error: "You have that anime already in your list.",
        status: 409,
      };
    }

    if (existAnimeError) {
      return { error: existAnimeError.message };
    } else {
      revalidatePath("/anime");
      return {
        message: "Anime successfully added to your list.",
        status: 201,
      };
    }
  } catch (error) {
    return { error: "Something goes wrong" };
  }
};
