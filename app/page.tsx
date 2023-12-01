import Landing from "./landing/Landing";
import Navigation from "./components/Navbar/Navigation";
import { createServerSupabaseClient } from "./lib/supabaseServer";

export default async function Home() {
  const supabase = createServerSupabaseClient();
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
