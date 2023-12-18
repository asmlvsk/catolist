import {
  extractOrderSubstring,
  selectedOrderName,
} from "@/app/lib/selectFilterCases";
import { createServerSupabaseClient } from "@/app/lib/supabaseServer";

export const searchingAction = async (
  userId: string,
  table: string,
  searchParams?: { [key: string]: string | string[] | undefined }
) => {
  const supabase = createServerSupabaseClient();
  const extractedOrderName = extractOrderSubstring(
    searchParams?.ordername as string
  );
  let query = supabase
    .from(`user_${table}`)
    .select(
      `
        id,
        review_text,
        tier,
        ...${table}!inner (
          title_id,
          title,
          image_url
        )
      `
    )
    .eq("user_id", userId);

  if (searchParams?.bytier) {
    query = query.filter("tier", "eq", searchParams?.bytier);
  }

  if (searchParams?.search) {
    query = query.filter(
      `${table}.title`,
      "ilike",
      `%${searchParams?.search}%`
    );
  }

  if (extractedOrderName === "title") {
    query = query.order(`${table}(${extractedOrderName})`, {
      ascending: selectedOrderName(searchParams?.ordername as string),
    });
  } else if (extractedOrderName === "tier") {
    query = query.order(`${extractedOrderName}`, {
      ascending: selectedOrderName(searchParams?.ordername as string),
    });
  } else {
    query = query.order("tier", { ascending: false });
  }

  query = query.order("tier", { ascending: false });

  return query;
};
