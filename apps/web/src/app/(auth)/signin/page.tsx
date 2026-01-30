"use client";

import Link from "next/link";

import { AuthBackgroundsPatterns } from "@/components/auth-bg-patterns";
import EmailField from "@/components/auth/primitives/email-field";
import PassField from "@/components/auth/primitives/pass-fields";
import { Button } from "@/components/ui/button";
import { CornerDecorations } from "@/components/ui/corner-decorations";
import { Form } from "@/components/ui/form";
import { useSignIn } from "@/hooks/screens/signIn.hooks";
import { cn } from "@/lib/utils";

export default function SignInPage() {
  const { form, onSubmitFormAction } = useSignIn();
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

        <div className="relative z-10 w-full max-w-100">
          <CornerDecorations />

          <div
            className={cn(
              "border-2 border-zinc-800/30 bg-neutral-900/10 p-8 shadow-2xl backdrop-blur-md"
            )}
          >
            <div className="pointer-events-none absolute inset-0 z-0 opacity-4">
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(315deg,background_0,background_1px,transparent_0,transparent_50%)] bg-size-[8px_8px] select-none" />
            </div>

            <div className="relative z-10">
              <form
                onSubmit={onSubmitFormAction}
                className="z-1000 flex flex-col gap-6"
              >
                <div className="space-y-2 text-center sm:text-left">
                  <h1 className="text-3xl font-bold tracking-tight text-white">
                    Welcome back
                  </h1>
                  <p className="text-sm text-zinc-400">
                    Authenticate to access your profile.
                  </p>
                </div>

                <div className="space-y-5">
                  <EmailField control={form.control} />
                  <PassField control={form.control} />
                </div>

                <div className="space-y-4 pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-white font-medium text-black transition-all duration-300 hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-400" />
                        Verifying...
                      </span>
                    ) : (
                      "Login"
                    )}
                  </Button>

                  <div className="text-center text-xs text-zinc-500">
                    No Account?
                    <Link
                      href="/signup"
                      className="px-1 text-zinc-300 underline-offset-4 transition-colors hover:text-white hover:underline"
                    >
                      Create one
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
