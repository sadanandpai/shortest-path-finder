"use client";

import { useActionState } from "react";
import { signInWithEmail, signInWithGoogle } from "@/lib/server/actions/auth";

export function SignIn() {
  const [state, formAction] = useActionState(signInWithEmail, { error: "" });

  return (
    <>
      <form action={formAction} className="auth-form">
        <input
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          required
        />
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password (8 - 20 characters)"
          minLength={8}
          maxLength={20}
          required
        />

        {state.error && <p className="error">{state.error}</p>}

        <button type="submit" className="btn">
          Sign in
        </button>
      </form>

      <form action={signInWithGoogle} className="auth-form">
        <button type="submit" className="btn">
          Google
        </button>
      </form>
    </>
  );
}
