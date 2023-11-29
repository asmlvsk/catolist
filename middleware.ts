import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res }, {});
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL("/unauthenticated", req.url));
  }

  // Check if the session token needs to be refreshed
  const timeNow = Math.floor(Date.now() / 1000);
  if (session.expires_at! <= timeNow) {
    try {
      const { error } = await supabase.auth.refreshSession();
      if (error) throw error;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    "/account/:path*",
    "/anime/:path*",
    "/manga/:path*",
    "/mylist/:path*",
  ],
};
