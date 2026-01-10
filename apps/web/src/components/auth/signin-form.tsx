"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import  Form  from "next/form";
import { SignInUser, SignUpUser } from "@/actions/auth-action";
import { useFormStatus } from "react-dom";

export function SignInForm() {
  const { pending } = useFormStatus();
  return (
    <Form action={SignInUser} className="space-y-4">
      {/* {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )} */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@example.com"
          required
          disabled={pending}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          disabled={pending}
        />
      </div>
      <Button type="submit" className="w-full" size="lg" disabled={pending}>
        {pending ? "Signing in..." : "Sign In"}
      </Button>
    </Form>
  );
}