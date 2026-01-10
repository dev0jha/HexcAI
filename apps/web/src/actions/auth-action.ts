"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function SignInUser(form: FormData) {
  try{
        const result = await auth.api.signInEmail({
          body: {
            email: form.get("email") as string,
            password: form.get("password") as string,
          },
          asResponse: true,
          headers: await headers(),
        });
        if(!result.ok){
          throw new Error("Incorrect email or password");
        }
        revalidatePath('/dashboard');
        return result;
  } catch (error) {
        throw new Error("Failed to sign in. Check your internet connection and try again.");
  }
}

export async function SignUpUser(form: FormData) {
  try{
      const result = await auth.api.signUpEmail({
        body: {
          name: form.get("firstName") as string + " " + (form.get("lastName") as string),
          email: form.get("email") as string,
          password: form.get("password") as string,
        },
      });
      return result;
  } catch (error) {
    throw new Error("Failed to sign up. Check your internet connection and try again.");
  }
}