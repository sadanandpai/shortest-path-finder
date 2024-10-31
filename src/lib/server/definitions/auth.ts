import { z } from "zod";

const nameSchema = z.string().min(3).max(50).trim();
const emailSchema = z.string().email().trim().toLowerCase();
const passwordSchema = z.string().min(8).max(20).trim();

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignInSchemaErrors = z.inferFlattenedErrors<
  typeof signInSchema
>["fieldErrors"];

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export type SignUpSchemaErrors = z.inferFlattenedErrors<
  typeof signUpSchema
>["fieldErrors"];
