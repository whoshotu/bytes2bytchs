import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="w-full max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
          bytes2bytchs
        </p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Private video rooms, made simple.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-8 text-zinc-400">
          Create an account or sign in to access your rooms.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            className="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300"
            href="/signup"
          >
            Create an account
          </Link>
          <Link
            className="rounded-lg border border-zinc-700 px-6 py-3 font-semibold transition hover:border-zinc-500 hover:bg-zinc-900"
            href="/login"
          >
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
