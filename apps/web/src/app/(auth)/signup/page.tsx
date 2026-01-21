"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useSignUp } from "@/hooks/screens/signUp.hook"
import NameFields from "@/components/auth/primitives/name-fields"
import EmailField from "@/components/auth/primitives/email-field"
import PassField from "@/components/auth/primitives/pass-fields"
import RoleSelectorField from "@/components/auth/primitives/role-selector"
import { CornerDecorations } from "@/components/ui/corner-decorations"
import { AuthBackgroundsPatterns } from "@/components/auth-bg-patterns"
import { cn } from "@/lib/utils"

export default function SignUpPage() {
  const { form, submitFormAction } = useSignUp()
  const {
    formState: { isSubmitting },
  } = form

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
              "border-2 border-zinc-800/30 bg-neutral-900/10 backdrop-blur-3xl p-8 shadow-2xl",
              "bg-[repeating-linear-gradient(315deg,background_0,background_1px,transparent_0,transparent_50%)] bg-size-[8px_8px] -z-10"
            )}
          >
            <form onSubmit={submitFormAction} className="flex flex-col gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-white">Create an account</h1>
                <p className="text-sm text-zinc-400">Create your account on HireXAI.</p>
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
                  className="w-full bg-white text-black hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating your account..." : "Create account"}
                </Button>

                <div className="text-center text-xs text-zinc-500">
                  Already verified?
                  <Link
                    href="/signin"
                    className="text-zinc-300 hover:text-white hover:underline underline-offset-4 transition-colors px-1"
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
  )
}
