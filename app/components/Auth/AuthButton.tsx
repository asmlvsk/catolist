"use client";

import GoogleIcon from "@/app/lib/icons";
import { createSupabaseClient } from "@/app/lib/supabaseClient";
import { Button } from "@nextui-org/react";
import React from "react";

export default function AuthButton() {
  const supabase = createSupabaseClient();

  const signIn = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Button
      endContent={<GoogleIcon width={20} height={20} color="white" />}
      onClick={signIn}
      color="primary"
    >
      Log in with Google
    </Button>
  );
}
