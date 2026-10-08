import "server-only";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type CurrentUser = {
  id: string;
  email: string;
};

/**
 * Data Access Layer for the session. Everything that needs to know "who is
 * calling" goes through here so the session is read in exactly one place.
 *
 * Reads the request cookie, so it must be called inside a <Suspense> boundary
 * (Cache Components turns an unbounded cookies() read into a build error).
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  "use cache: private";

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return null;
  }

  const claims = data.claims;
  const id = typeof claims.sub === "string" ? claims.sub : null;
  const email = typeof claims.email === "string" ? claims.email : null;

  if (!id || !email) {
    return null;
  }

  return { id, email };
}

/**
 * Same as getCurrentUser, but redirects to /login when there is no session.
 * Use in pages and Server Actions that require an authenticated caller.
 */
export async function requireUser(redirectTo = "/login"): Promise<CurrentUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect(redirectTo);
  }

  return user;
}

/** Admins are an allowlist in ADMIN_EMAILS, not a database role. */
export function isAdmin(email: string): boolean {
  const admins = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  return admins.includes(email.toLowerCase());
}
