"use client"

import { Input as InputPrimitive } from "@base-ui/react/input"
import type * as React from "react"
import { cn } from "@/lib/utils"

type InputProps = Omit<InputPrimitive.Props & React.RefAttributes<HTMLInputElement>, "size"> & {
  size?: "sm" | "default" | "lg" | number
  unstyled?: boolean
}

function Input({ className, size = "default", unstyled = false, ...props }: InputProps) {
  return (
    <span
      data-slot="input-control"
      className={cn(
        !unstyled &&
          `
          relative isolate inline-flex w-full items-stretch rounded-lg
          transition-colors
          ring-2
		  ring-zinc-300/20
          has-focus-visible:border-zinc-500
          has-focus-visible:ring-2 
          has-focus-visible:ring-zinc-100/40
          has-aria-invalid:border-red-500
          has-aria-invalid:border-0
          has-aria-invalid:ring-1
          has-aria-invalid:ring-red-500
          `,
        className
      )}
    >
      <InputPrimitive
        {...props}
        className={cn(
          `
          w-full h-full
          rounded-[inherit]
          bg-background
          text-foreground
          placeholder:text-muted-foreground/70
          outline-none
          border-0
          px-3
          `,
          size === "sm" && "h-9 text-sm",
          size === "default" && "h-11",
          size === "lg" && "h-12 text-lg"
        )}
      />
    </span>
  )
}

export { Input, type InputProps }
