import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  type CookieOptions,
  createServerClient,
  createBrowserClient,
} from "@supabase/ssr";
import { getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { cache } from "react";

export const createClientSupabaseClient = (serverComponent = false) => {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          if (serverComponent) return;
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          if (serverComponent) return;
          cookieStore.delete({ name, ...options });
        },
      },
    }
  );
};

export const createMiddlewareSupabaseClient = (
  req: NextRequest,
  res: NextResponse
) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return getCookie(name, { req, res });
        },
        set(name: string, value: string, options: CookieOptions) {
          setCookie(name, value, { req, res, ...options });
        },
        remove(name: string, options: CookieOptions) {
          setCookie(name, "", { req, res, ...options });
        },
      },
    }
  );
};

export function createServerSupabaseClient() {
  return createClientSupabaseClient(true);
}
