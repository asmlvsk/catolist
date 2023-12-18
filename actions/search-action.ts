import {
  extractOrderSubstring,
  selectedOrderName,
} from "@/app/lib/selectFilterCases";
import { createServerSupabaseClient } from "@/app/lib/supabaseServer";
import { Session } from "@supabase/supabase-js";

export const searchingAction = async (
  session: Session | null,
  table: string,
  phrase?: string,
  bytier?: string,
  ordername?: string
) => {
  const supabase = createServerSupabaseClient();
  const extractedOrderName = extractOrderSubstring(ordername as string);
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
    .eq("user_id", session?.user.id!);

  if (bytier) {
    query = query.filter("tier", "eq", bytier);
  }

  if (phrase) {
    query = query.filter(`${table}.title`, "ilike", `%${phrase}%`);
  }

  if (extractedOrderName === "title") {
    query = query.order(`${table}(${extractedOrderName})`, {
      ascending: selectedOrderName(ordername as string),
    });
  } else if (extractedOrderName === "tier") {
    query = query.order(`${extractedOrderName}`, {
      ascending: selectedOrderName(ordername as string),
    });
  } else {
    query = query.order("tier", { ascending: false });
  }

  query = query.order("tier", { ascending: false });

  return query;
};
