import type { Metadata } from "next";

import { signup } from "@/app/actions/auth";
import { AuthForm } from "@/app/_components/auth-form";

export const metadata: Metadata = {
  title: "Create an account | bytes2bytchs",
};

export default function SignupPage() {
  return <AuthForm action={signup} mode="signup" />;
}
