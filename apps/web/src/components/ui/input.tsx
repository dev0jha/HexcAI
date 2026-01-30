"use client";

import type * as React from "react";

import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

type InputProps = Omit<
  InputPrimitive.Props & React.RefAttributes<HTMLInputElement>,
  "size"
> & {
  size?: "sm" | "default" | "lg" | number;
  unstyled?: boolean;
};

function Input({
  className,
  size = "default",
  unstyled = false,
  ...props
}: InputProps) {
  return (
    <span
      data-slot="input-control"
      className={cn(
        !unstyled &&
          `relative isolate inline-flex w-full items-stretch rounded-lg bg-zinc-800/50 ring-1 ring-zinc-700/50 transition-colors has-focus-visible:border-zinc-500 has-focus-visible:ring-1 has-focus-visible:ring-zinc-500/50 has-aria-invalid:border-0 has-aria-invalid:border-red-500 has-aria-invalid:ring-1 has-aria-invalid:ring-red-500`,
        className
      )}
    >
      <InputPrimitive
        {...props}
        className={cn(
          `h-full w-full rounded-[inherit] border-0 bg-transparent px-3 text-zinc-100 outline-none placeholder:text-zinc-500/70`,
          size === "sm" && "h-9 text-sm",
          size === "default" && "h-11",
          size === "lg" && "h-12 text-lg"
        )}
      />
    </span>
  );
}

export { Input, type InputProps };
