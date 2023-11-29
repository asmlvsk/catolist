"use client";

import GoogleIcon from "@/app/lib/icons";
import { Button } from "@nextui-org/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

export default function AuthButton() {
  const supabase = createClientComponentClient<Database>();

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
      color="primary"
      onClick={signIn}
    >
      Log in with Google
    </Button>
  );
}
