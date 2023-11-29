import React from "react";
import NavBar from "./NavBar";
import { Session } from "@supabase/supabase-js";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { createServerSupabaseClient } from "@/app/lib/supabaseServer";

type SessionNav = {
  session?: Session | null;
};

export default async function Navigation({ session }: SessionNav) {
  const cookieStore = cookies();
  const supabase = createServerSupabaseClient();
  let {
    data: profile,
    error,
    status,
  } = await supabase
    .from("profile")
    .select("*")
    .eq("id", session?.user.id!)
    .single();

  return <NavBar session={session} profile={profile} />;
}
