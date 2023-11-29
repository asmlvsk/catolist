"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateAnime = async ({
  item_id,
  review_text,
  tier,
}: MergedUpdateAnimeManga) => {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!item_id) {
      return;
    }

    const { data, error, status } = await supabase
      .from("user_anime")
      .update({ review_text: review_text, tier: tier })
      .eq("user_id", session?.user.id!)
      .eq("id", item_id)
      .select();

    if (error) {
      return { error: "Error in updating anime." };
    } else {
      revalidatePath("/mylist/anime");
      return {
        message: "Anime successfully updated.",
        status: status,
      };
    }
  } catch (error) {
    return { error: "Something goes wrong" };
  }
};
