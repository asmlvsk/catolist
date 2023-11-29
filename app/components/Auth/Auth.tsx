import React, { useContext, useEffect } from "react";
import AuthButton from "./AuthButton";
import LogoutButton from "./LogoutButton";
import { supabase } from "@/app/lib/supabaseServer";

export const Auth = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <div>{!session ? <AuthButton /> : <LogoutButton />}</div>;
};
