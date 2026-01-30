"use client";

import Link from "next/link";

import { AuthBackgroundsPatterns } from "@/components/auth-bg-patterns";
import EmailField from "@/components/auth/primitives/email-field";
import NameFields from "@/components/auth/primitives/name-fields";
import PassField from "@/components/auth/primitives/pass-fields";
import RoleSelectorField from "@/components/auth/primitives/role-selector";
import { Button } from "@/components/ui/button";
import { CornerDecorations } from "@/components/ui/corner-decorations";
import { Form } from "@/components/ui/form";
import { useSignUp } from "@/hooks/screens/signUp.hooks";
import { cn } from "@/lib/utils";

export default function SignUpPage() {
  const { form, submitFormAction } = useSignUp();
  const {
    formState: { isSubmitting },
  } = form;

  return (
    <Form {...form}>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-4">
        <div className="absolute inset-0 z-0">
          <AuthBackgroundsPatterns />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />
        </div>

        <div className="relative z-10 w-full max-w-120">
          <CornerDecorations />

          <div
            className={cn(
              "border-2 border-zinc-800/30 bg-neutral-900/10 p-8 shadow-2xl backdrop-blur-3xl"
            )}
          >
            <div className="pointer-events-none absolute inset-0 z-0 opacity-4">
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(315deg,background_0,background_1px,transparent_0,transparent_50%)] bg-size-[8px_8px] select-none" />
            </div>
            <form onSubmit={submitFormAction} className="flex flex-col gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  Create an account
                </h1>
                <p className="text-sm text-zinc-400">
                  Create your account on HireXAI.
                </p>
              </div>

              <div className="space-y-5">
                <NameFields control={form.control} />
                <EmailField control={form.control} />
                <RoleSelectorField control={form.control} />
                <PassField control={form.control} confirmPassword />
              </div>

              <div className="space-y-4 pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-white font-medium text-black transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating your account..." : "Create account"}
                </Button>

                <div className="text-center text-xs text-zinc-500">
                  Already verified?
                  <Link
                    href="/signin"
                    className="px-1 text-zinc-300 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Form>
  );
}
