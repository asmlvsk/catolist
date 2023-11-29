import React from "react";
import NavBar from "./NavBar";
import { supabase } from "@/app/lib/supabaseServer";
import { Session } from "@supabase/supabase-js";

type SessionNav = {
  session?: Session | null;
};

export default async function Navigation({ session }: SessionNav) {
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
