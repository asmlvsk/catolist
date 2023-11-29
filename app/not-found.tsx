import Image from "next/image";
import Link from "next/link";
import React from "react";
import cat404 from "../public/404cat.png";
import Navigation from "./components/Navbar/Navigation";
import { supabase } from "./lib/supabaseServer";
import { Button } from "@nextui-org/react";

export default async function NotFound() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <>
      <Navigation session={session} />
      <main className="main items-center text-left flex gap-8 h-full justify-center max-lg:flex-col max-lg:gap-0">
        <div className="flex flex-col gap-3 max-lg:items-center mt-5 ">
          <h1 className="text-3xl">There was a problem.</h1>
          <p>We could not find the page what you were looking for.</p>
          <Link href="/">
            <Button variant="bordered" color="primary">
              Go back
            </Button>
          </Link>

          <h1 className="text-[200px]">404</h1>
        </div>
        <div className="w-[1px] bg-primary-600 h-1/2"></div>
        <Link href="/">
          <div className="relative h-[400px] w-[400px] max-lg:h-[300px] max-lg:w-[300px]">
            <Image src={cat404} alt="404 cat" objectFit="contain" />
          </div>
        </Link>
      </main>
    </>
  );
}
