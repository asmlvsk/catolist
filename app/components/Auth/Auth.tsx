import React from "react";
import AuthButton from "./AuthButton";
import LogoutButton from "./LogoutButton";
import { createServerSupabaseClient } from "@/app/lib/supabaseServer";

export const Auth = async () => {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <div>{!session ? <AuthButton /> : <LogoutButton />}</div>;
};
