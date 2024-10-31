"use client";

import { useActionState } from "react";
import Image from "next/image";
import { signInWithEmail, signInWithGoogle } from "@/lib/server/actions/auth";
import { EmailField, PasswordField } from "../common/fields";
import { routes } from "@/lib/common/routes";
import Link from "next/link";
import classes from "./auth-form.module.scss";

export function SignIn() {
  const [state, formAction] = useActionState(signInWithEmail, { error: "" });

  return (
    <div className={classes.authFormWrapper}>
      <form action={formAction} className={classes.authForm}>
        <EmailField />
        <PasswordField />

        {state.error && <p className="error">{state.error}</p>}

        <button type="submit" className="btn">
          Sign in
        </button>
      </form>

      <div className={classes.authFormLinks}>
        <Link
          href={routes.forgotPassword}
          aria-disabled="true"
          className="disabled"
        >
          Forgot password?
        </Link>
        <Link href={routes.signUp}>Sign up</Link>
      </div>

      <div className={classes.oauthForms}>
        <p>Or sign in with</p>
        <div className={classes.oauthFormsIcons}>
          <form action={signInWithGoogle} className="">
            <button type="submit">
              <Image src="/google.svg" alt="Google" width={40} height={40} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
