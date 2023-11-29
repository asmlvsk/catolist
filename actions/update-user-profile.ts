"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateUserProfile = async ({ nickname }: Profile) => {
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
      .update({ nickname: nickname })
      .eq("id", session?.user.id)
      .select();

    if (error) {
      if (status === 400) {
        return {
          message: error.message,
          status: status,
        };
      } else {
        return { error: "Error in updating your profile." };
      }
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
