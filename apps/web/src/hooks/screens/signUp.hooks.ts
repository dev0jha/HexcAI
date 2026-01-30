"use client";

import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { signUpUserAction } from "@/actions/auth.actions";
import {
  signUpSchema,
  type SignUpSchema,
} from "@/utils/validation/register.validation";

export function useSignUp() {
  const router = useRouter();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "candidate",
    },
  });

  async function onSubmit(values: SignUpSchema) {
    const toastId = toast.loading("creating account....");

    const response = await signUpUserAction(values);
    if (!response.success) {
      toast.error(response.error, { id: toastId });
      return;
    }

    toast.success("Sign In successfull!!", { id: toastId });
    router.push("/signin");
  }

  const submitFormAction = form.handleSubmit(onSubmit);

  return {
    submitFormAction,
    form,
  };
}
