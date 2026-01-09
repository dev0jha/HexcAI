import { cn } from "@/lib/utils"
import React from "react"

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("max-w-5xl mx-auto container", className)}>{children}</div>
}
