"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateUserPrivatness = async (privatness: boolean) => {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient<Database>({
      cookies: () => cookieStore,
    });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return;
    }

    const { data, error, status } = await supabase
      .from("profile")
      .update({ private: privatness })
      .eq("id", session?.user.id)
      .select();

    if (error) {
      return { error: "Error in updating your profile." };
    } else {
      revalidatePath("/account");
      return {
        message: "Profile successfully updated.",
        status: status,
      };
    }
  } catch (error) {
    return { error: "Something goes wrong" };
  }
};
