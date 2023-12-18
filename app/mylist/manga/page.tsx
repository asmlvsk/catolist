import React from "react";
import Navigation from "@/app/components/Navbar/Navigation";
import { DataList } from "../DataList";
import { createServerSupabaseClient } from "@/app/lib/supabaseServer";
import { QueryData } from "@supabase/supabase-js";
import { searchingAction } from "@/actions/search-action";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function MyList({ searchParams }: Props) {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const combinedData = await searchingAction(
    session?.user.id!,
    "manga",
    searchParams
  );

  type CombinedDataType = QueryData<typeof combinedData>;

  const typedCombinedData: CombinedDataType[] =
    combinedData.data as CombinedDataType[];

  return (
    <>
      <Navigation session={session} />
      <DataList data={typedCombinedData} infoType="manga" />
    </>
  );
}
