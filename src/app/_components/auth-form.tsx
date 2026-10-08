"use client";

import Link from "next/link";
import { useActionState } from "react";

import type { AuthState } from "@/app/actions/auth";

type AuthAction = (state: AuthState, formData: FormData) => Promise<AuthState>;

type AuthFormProps = {
  action: AuthAction;
  mode: "login" | "signup";
};

const initialState: AuthState = {};

export function AuthForm({ action, mode }: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const isSignup = mode === "signup";

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12 text-zinc-100">
      <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 shadow-2xl sm:p-10">
        <Link
          className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400"
          href="/"
        >
          bytes2bytchs
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {isSignup
            ? "Sign up to get access to your private video rooms."
            : "Log in to continue to your video rooms."}
        </p>

        <form action={formAction} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              autoComplete="email"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              id="email"
              name="email"
              required
              type="email"
              aria-describedby={state.errors?.email ? "email-error" : undefined}
            />
            {state.errors?.email && (
              <p className="mt-1 text-sm text-rose-300" id="email-error">
                {state.errors.email.join(" ")}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              autoComplete={isSignup ? "new-password" : "current-password"}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              id="password"
              name="password"
              required
              type="password"
              aria-describedby={
                state.errors?.password
                  ? "password-error"
                  : isSignup
                    ? "password-hint"
                    : undefined
              }
            />
            {state.errors?.password && (
              <p className="mt-1 text-sm text-rose-300" id="password-error">
                {state.errors.password.join(" ")}
              </p>
            )}
            {isSignup && (
              <p className="mt-2 text-xs leading-5 text-zinc-500" id="password-hint">
                Use at least 8 characters, including a letter, number, and special
                character.
              </p>
            )}
          </div>

          {isSignup && (
            <div>
              <label
                className="mb-2 block text-sm font-medium"
                htmlFor="confirmPassword"
              >
                Confirm password
              </label>
              <input
                autoComplete="new-password"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                id="confirmPassword"
                name="confirmPassword"
                required
                type="password"
                aria-describedby={
                  state.errors?.confirmPassword
                    ? "confirm-password-error"
                    : undefined
                }
              />
              {state.errors?.confirmPassword && (
                <p
                  className="mt-1 text-sm text-rose-300"
                  id="confirm-password-error"
                >
                  {state.errors.confirmPassword.join(" ")}
                </p>
              )}
            </div>
          )}

          {state.message && (
            <p
              aria-live="polite"
              className="rounded-lg border border-cyan-900 bg-cyan-950/50 px-3 py-2 text-sm text-cyan-200"
              role="status"
            >
              {state.message}
            </p>
          )}

          <button
            className="w-full rounded-lg bg-cyan-400 px-4 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={pending}
            type="submit"
          >
            {pending
              ? isSignup
                ? "Creating account…"
                : "Logging in…"
              : isSignup
                ? "Create account"
                : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-400">
          {isSignup ? "Already have an account?" : "New to bytes2bytchs?"}{" "}
          <Link
            className="font-semibold text-cyan-300 underline-offset-4 hover:underline"
            href={isSignup ? "/login" : "/signup"}
          >
            {isSignup ? "Log in" : "Create an account"}
          </Link>
        </p>
      </section>
    </main>
  );
}
