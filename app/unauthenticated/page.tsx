import { redirect } from "next/navigation";
import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import CustomButton from "../components/CustomButton";

export default async function Unauthenticated() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }
  return (
    <section className="flex items-center justify-center h-screen text-center">
      <div className="flex flex-col gap-3">
        You are not authorized. Please log in or sign up to see content.
        <Link href={"/"}>
          <CustomButton title="Go back to main page" />
        </Link>
      </div>
    </section>
  );
}
