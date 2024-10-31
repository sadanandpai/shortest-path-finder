"use client";

import { useActionState } from "react";
import { signInWithGoogle, signUpWithEmail } from "@/lib/server/actions/auth";
import { EmailField, FullNameField, PasswordField } from "../common/fields";
import classes from "./auth-form.module.scss";
import Link from "next/link";
import { routes } from "@/lib/common/routes";
import Image from "next/image";

export function SignUp() {
  const [state, formAction] = useActionState(signUpWithEmail, { error: "" });

  return (
    <div className={classes.authFormWrapper}>
      <form action={formAction} className={classes.authForm}>
        <FullNameField />
        <EmailField />
        <PasswordField />

        {state.error && <p className="error">{state.error}</p>}

        <button type="submit" className="btn">
          Sign up
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
        <Link href={routes.signIn}>Sign in</Link>
      </div>

      <div className={classes.oauthForms}>
        <p>Or sign up with</p>
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
