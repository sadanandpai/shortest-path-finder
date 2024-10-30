"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cookieName } from "@/lib/server/config/auth";
import {
  getLoggedInUserController,
  signInWithEmailController,
  signInWithOAuthController,
  signOutController,
  signUpWithEmailController,
} from "@/lib/server/controller/auth";
import { validateSignIn, validateSignUp } from "@/lib/server/utils/auth";
import { routes } from "@/lib/common/routes";

export async function signInWithEmail(
  _prev: { error: string },
  formData: FormData
) {
  const inputEmail = formData.get("email")?.toString()?.trim();
  const inputPassword = formData.get("password")?.toString()?.trim();

  try {
    const { email, password } = await validateSignIn(inputEmail, inputPassword);
    const secret = await signInWithEmailController(email, password);
    const cookieStore = await cookies();
    cookieStore.set(cookieName, secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    redirect(routes.profile);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An error occurred. Please try again." };
  }
}

export async function signInWithGoogle() {
  return await signInWithOAuthController();
}

export async function signUpWithEmail(
  _prev: { error: string },
  formData: FormData
) {
  const inputName = formData.get("name")?.toString()?.trim();
  const inputEmail = formData.get("email")?.toString()?.trim();
  const inputPassword = formData.get("password")?.toString()?.trim();

  try {
    const { name, email, password } = await validateSignUp(
      inputName,
      inputEmail,
      inputPassword
    );
    const secret = await signUpWithEmailController(name, email, password);
    const cookieStore = await cookies();
    cookieStore.set(cookieName, secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    redirect(routes.profile);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An error occurred. Please try again." };
  }
}

export async function signOut() {
  signOutController();
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
  redirect(routes.signIn);
}

export async function getLoggedInUser() {
  try {
    return await getLoggedInUserController();
  } catch {
    return null;
  }
}
