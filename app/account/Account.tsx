import { Toaster } from "sonner";
import { Auth } from "../components/Auth/Auth";
import Navigation from "../components/Navbar/Navigation";
import ProfileFields from "./ProfileFields";
import LinkToBtn from "./LinkToBtn";
import Title from "../components/Title";
import { createServerSupabaseClient } from "../lib/supabaseServer";

export default async function AccountForm() {
  const supabase = createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error, status } = await supabase
    .from("profile")
    .select("*")
    .eq("id", session?.user?.id!)
    .single();

  const base = process.env.NEXT_PUBLIC_BASE_URL;

  const linkToList = base + `/user/${session?.user.id}`;

  return (
    <>
      <Navigation session={session} />
      <div className="p-10 flex flex-col gap-5">
        <Title text={`${data?.nickname} profile`} />

        <ProfileFields profile={data} />

        <div className="flex gap-4 items-center">
          <p>Your list link:</p>
          <LinkToBtn link={linkToList} />
        </div>

        <Auth />

        <Toaster richColors />
      </div>
    </>
  );
}
