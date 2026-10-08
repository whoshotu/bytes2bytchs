import type { Metadata } from "next";

import { login } from "@/app/actions/auth";
import { AuthForm } from "@/app/_components/auth-form";

export const metadata: Metadata = {
  title: "Log in | bytes2bytchs",
};

export default function LoginPage() {
  return <AuthForm action={login} mode="login" />;
}
