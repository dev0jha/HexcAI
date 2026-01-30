import { z } from "zod";

import { userRoles } from "@/db/schema/enums";
import {
  emailValidationSchema,
  passwordValidationSchema,
} from "@/utils/validation/signIn.validation";

export const signUpSchema = z
  .object({
    firstName: z
      .string({ message: "First name is required" })
      .trim()
      .min(1, "First name is required")
      .max(50, "First name is too long"),

    lastName: z
      .string({ message: "Last name is required" })
      .trim()
      .min(1, "Last name is required")
      .max(50, "Last name is too long"),

    email: emailValidationSchema,
    password: passwordValidationSchema,
    role: z.enum(userRoles.enumValues, { message: "Invalid user role" }),
    confirmPassword: z.string({ message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
