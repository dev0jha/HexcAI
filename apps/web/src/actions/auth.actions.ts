"use server";

import { auth } from "@/lib/auth";
import type { ActionRes } from "@/types/actions";
import { attempt } from "@/utils/attempt";
import type { SignUpSchema } from "@/utils/validation/register.validation";
import type { SignInSchema } from "@/utils/validation/signIn.validation";

export async function signInUserAction(
  formValues: SignInSchema
): Promise<ActionRes> {
  const result = await attempt(() =>
    auth.api.signInEmail({
      body: formValues,
      asResponse: true,
    })
  );
  if (!result.ok) {
    console.error("Failed sign In", result.error);
    return {
      success: false,
      error: "Sign in failed!",
    };
  }

  const authResponse = result.data;
  if (!authResponse.ok) {
    const errorParseResponse = await attempt(() => authResponse.json());
    if (!errorParseResponse.ok) {
      return {
        success: false,
        error: authResponse.statusText,
      };
    }

    const errorData = errorParseResponse.data as { message: string };
    return {
      success: false,
      error: errorData.message ?? "Invalid credentials",
    };
  }

  return {
    success: true,
  };
}

export async function signUpUserAction({
  firstName,
  lastName,
  email,
  password,
  role,
}: SignUpSchema): Promise<ActionRes> {
  const result = await attempt(() =>
    auth.api.signUpEmail({
      body: {
        name: firstName + lastName,
        email: email,
        password: password,
        role,
      },
    })
  );

  if (!result.ok) {
    console.error("Failed sign Up", result.error);
    return {
      success: false,
      error: result.error.message ?? "Sign up failed",
    };
  }

  return {
    success: true,
  };
}
