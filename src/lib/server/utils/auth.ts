import { object, string } from "yup";

const signInSchema = object({
  email: string().email().required(),
  password: string().required().min(8).max(20),
});

const signUpSchema = object({
  name: string().required().min(3).max(50),
  email: string().email().required(),
  password: string().required().min(8).max(20),
});

export async function validateSignIn(email?: string, password?: string) {
  return await signInSchema.validate({
    password,
    email,
  });
}

export async function validateSignUp(
  name?: string,
  email?: string,
  password?: string
) {
  return await signUpSchema.validate({
    name,
    email,
    password,
  });
}
