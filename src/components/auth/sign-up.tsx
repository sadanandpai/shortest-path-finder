"use client";

import { signUpWithEmail } from "@/lib/server/actions/auth";
import { useActionState } from "react";

export function SignUp() {
  const [state, formAction] = useActionState(signUpWithEmail, { error: "" });

  return (
    <form action={formAction} className="auth-form">
      <input
        id="name"
        name="name"
        placeholder="Name"
        type="text"
        minLength={3}
        maxLength={50}
        required
      />
      <input
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        required
      />
      <input
        id="password"
        name="password"
        placeholder="Password"
        minLength={8}
        maxLength={20}
        type="password"
        required
      />

      {state.error && <p className="error">{state.error}</p>}

      <button type="submit" className="btn">
        Sign up
      </button>
    </form>
  );
}
