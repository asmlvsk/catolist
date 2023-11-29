import Image from "next/image";
import Landing from "./components/Landing";
import Navigation from "./components/Navbar/Navigation";
import { supabase } from "./lib/supabaseServer";

export default async function Home() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <main>
      <Navigation session={session} />
      <Landing />
    </main>
  );
}
