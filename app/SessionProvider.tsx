"use client";

import type { Session, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useState, useEffect } from "react";
import { createSupabaseClient } from "./lib/supabaseClient";

type MaybeSession = Session | null;

type SupabaseContext = {
  supabase: SupabaseClient;
  userSession: MaybeSession;
  userDetails: Profile | null;
  isLoading: boolean;
};

// @ts-ignore
const Context = createContext<SupabaseContext>();

//TODO get stripe subscription data
export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userDetails, setUserDetails] = useState<Profile | null>(null);
  const [userSession, setUserSession] = useState<Session | null>(null);
  const [isLoading, setLoading] = useState(false);
  const supabase = createSupabaseClient();
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        let {
          data: profileData,
          error,
          status,
        } = await supabase
          .from("profile")
          .select("*")
          .eq("id", newSession?.user?.id!)
          .single();
        setUserDetails(profileData);
        setUserSession(newSession);
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  return (
    <Context.Provider value={{ supabase, userSession, userDetails, isLoading }}>
      {children}
    </Context.Provider>
  );
}

export const useSupabase = () => useContext(Context);
