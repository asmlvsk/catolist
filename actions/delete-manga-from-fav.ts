"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type Props = {
  itemId: string;
};

export const deleteMangaFromFav = async ({ itemId }: Props) => {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });

    if (!itemId) {
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { error, status } = await supabase
      .from("user_manga")
      .delete()
      .eq("id", itemId)
      .eq("user_id", session?.user.id!);

    if (error) {
      return { error: error.message };
    } else {
      revalidatePath("/mylist/manga");
      return {
        message: "Manga successfully deleted from your list.",
        status: 200,
      };
    }
  } catch (error) {
    return { error: "Something goes wrong" };
  }
};
