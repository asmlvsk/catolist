"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const addMangaToFav = async ({
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
      .from("manga")
      .select("title_id")
      .eq("title_id", title_id)
      .limit(1);

    if (!existingRecord || existingRecord.length === 0) {
      const { error, status } = await supabase
        .from("manga")
        .insert([{ title, title_id: title_id, image_url: image_url }]);

      if (error) {
        return { error: error.message, status: status };
      }
    }

    const { data: existManga, error: existMangaError } = await supabase
      .from("user_manga")
      .select("*")
      .match({ user_id: session?.user.id, manga_id: title_id })
      .limit(1);

    if (!existManga || existManga.length === 0) {
      const { error, status, data } = await supabase
        .from("user_manga")
        .insert([
          { user_id: session?.user.id, manga_id: title_id, tier: tier },
        ]);

      if (error) {
        return {
          error: error.message,
          status: status,
        };
      }
    } else {
      return {
        error: "You have that manga already in your list.",
        status: 409,
      };
    }

    if (existMangaError) {
      return { error: existMangaError.message };
    } else {
      revalidatePath("/manga");
      return {
        message: "Manga successfully added to your list.",
        status: 201,
      };
    }
  } catch (error) {
    return { error: "Something goes wrong" };
  }
};
