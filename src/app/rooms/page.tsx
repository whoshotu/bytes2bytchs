import { Suspense } from "react";

import { logout } from "@/app/actions/auth";
import { requireUser } from "@/lib/auth";

export default function RoomsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-100">
      <div className="mx-auto max-w-4xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              bytes2bytchs
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Your rooms</h1>
          </div>
          <Suspense
            fallback={
              <div
                aria-label="Loading account"
                className="h-10 w-28 animate-pulse rounded-lg bg-zinc-800"
              />
            }
          >
            <AccountControls />
          </Suspense>
        </header>

        <section className="mt-10 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/40 px-6 py-12 text-center">
          <h2 className="text-xl font-semibold">Your room list is empty</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-zinc-400">
            Room creation and paid access are coming soon. Once rooms are
            available, they will appear here.
          </p>
        </section>
      </div>
    </main>
  );
}

async function AccountControls() {
  const user = await requireUser();

  return (
    <div className="flex items-center gap-4">
      <p className="max-w-48 truncate text-sm text-zinc-400">{user.email}</p>
      <form action={logout}>
        <button
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium transition hover:border-zinc-500 hover:bg-zinc-900"
          type="submit"
        >
          Log out
        </button>
      </form>
    </div>
  );
}
