"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cookieName } from "@/lib/server/config/auth";
import {
  getSession,
  createSessionWithEmail,
  redirectToOAuth,
  destroySession,
  initiateSessionWithEmail,
} from "@/lib/server/controller/auth";
import { validateSignIn, validateSignUp } from "@/lib/server/utils/auth";
import { routes } from "@/lib/common/routes";
import { setSecureCookie } from "../utils/cookies";
import { SignInSchemaErrors, SignUpSchemaErrors } from "../definitions/auth";

export async function signInWithEmail(
  _prev: {
    errors: SignInSchemaErrors;
  },
  formData: FormData
) {
  const validatorResult = validateSignIn(formData);
  if (!validatorResult.success) {
    return { errors: validatorResult.error.flatten().fieldErrors };
  }

  const { email, password } = validatorResult.data;
  const secret = await createSessionWithEmail(email, password);
  await setSecureCookie(cookieName, secret);
  redirect(routes.profile);
}

export async function signInWithGoogle() {
  return await redirectToOAuth();
}

export async function signUpWithEmail(
  _prev: { errors: SignUpSchemaErrors },
  formData: FormData
) {
  const validatorResult = validateSignUp(formData);
  if (!validatorResult.success) {
    return { errors: validatorResult.error.flatten().fieldErrors };
  }

  const { name, email, password } = validatorResult.data;
  const secret = await initiateSessionWithEmail(name, email, password);
  await setSecureCookie(cookieName, secret);
  redirect(routes.profile);
}

export async function signOut() {
  destroySession();
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
  redirect(routes.signIn);
}

export async function getLoggedInUser() {
  return await getSession();
}
