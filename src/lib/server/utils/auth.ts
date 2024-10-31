import { signInSchema, signUpSchema } from "../definitions/auth";

export function validateSignIn(formData: FormData) {
  return signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
}

export function validateSignUp(formData: FormData) {
  return signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
}
