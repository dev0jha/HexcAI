import { z } from "zod";

export const emailValidationSchema = z.email({
  message: "Invalid email address",
});

export const passwordValidationSchema = z
  .string({ message: "Password is required" })
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password is too long");

export const signInSchema = z.object({
  email: emailValidationSchema,
  password: passwordValidationSchema,
});

export type SignInSchema = z.infer<typeof signInSchema>;
