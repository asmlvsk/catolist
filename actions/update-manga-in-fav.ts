"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateManga = async ({
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
      .from("user_manga")
      .update({ review_text: review_text, tier: tier })
      .eq("user_id", session?.user.id!)
      .eq("id", item_id)
      .select();

    if (error) {
      return { error: "Error in updating manga." };
    } else {
      revalidatePath("/mylist/manga");
      return {
        message: "Manga successfully updated.",
        status: status,
      };
    }
  } catch (error) {
    return { error: "Something goes wrong" };
  }
};
