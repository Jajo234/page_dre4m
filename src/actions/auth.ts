"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/lib/repositories/auth";

export async function loginAction(formData: FormData) {
  const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  const { error } = await signIn(email, password);

  if (error) {
    return {
      error: error.message,
    };
  }

  redirect("/admin/dashboard");
}
