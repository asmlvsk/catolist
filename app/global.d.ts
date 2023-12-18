import { Database as DB } from "./types/database.types";

declare global {
  type Database = DB;

  type InsertAnimeManga = DB["public"]["Tables"]["user_anime"]["Insert"];
  type UpdateAnimeManga = DB["public"]["Tables"]["user_anime"]["Update"];
  type AnimeManga = DB["public"]["Tables"]["anime"]["Row"];
  type Profile = DB["public"]["Tables"]["profile"]["Update"];
  type TierEnum = DB["public"]["Enums"]["anime_tier"];

  type MergedInsertAnimeManga = Pick<
    InsertAnimeManga & AnimeManga,
    "title_id" | "title" | "image_url" | "tier"
  >;

  type MergedUpdateAnimeManga = Pick<
    UpdateAnimeManga & AnimeManga,
    "item_id" | "review_text" | "tier"
  >;
}

export type CombinedDataType = {
  id: string | undefined;
  review_text: string | null;
  tier: "D" | "C" | "B" | "A" | "S" | null;
  image_url: string | null;
  title: string | null;
  title_id: number;
};
