"use client"

import React, { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { PlusIcon } from "@/components/ui/plus-icon"

export interface NavItem {
  label: string
  href: string
}

export interface NavbarProps {
  items?: NavItem[]
  className?: string
}

export function Navbar({
  items = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Pricing", href: "#pricing" },
  ],
  className,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn("fixed top-0 left-0 right-0 z-50", className)}>
      <header className="relative w-full border-b border-white/5 bg-black/10">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 backdrop-blur-md">
          <PlusIcon className="absolute -bottom-1.5 -left-1.5 text-white/30" />
          <PlusIcon className="absolute -bottom-1.5 -right-1.5 text-white/30" />
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-lg font-bold tracking-tight text-white">HireXAI</span>
            </Link>
          </div>

          <nav className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ul className="flex items-center gap-1 rounded-lg border-[1.5] border-dashed border-white/10 px-2 py-1">
              {items.map((item, idx) => {
                const isActive =
                  pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))

                return (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className={cn(
                        "relative block px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full",
                        isActive ? "text-white font-bold" : "text-zinc-400 hover:text-zinc-100"
                      )}
                    >
                      {isActive && (
                        <div className="absolute inset-0 -z-10 rounded-full bg-zinc-800/80 shadow-[0_1px_2px_rgba(0,0,0,0.5)] border border-white/10" />
                      )}
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/signin">
              <button
                className={cn(
                  "relative items-center justify-center px-4 py-1.5 hidden sm:flex",
                  "text-sm shadow-lg font-medium text-shadow-black/70 text-shadow-xl tracking-wide rounded-md transition-all duration-300",
                  "bg-white text-black hover:bg-zinc-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                )}
              >
                Login
              </button>
            </Link>

            <button
              className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-b border-white/10 bg-black"
            >
              <ul className="flex flex-col p-4 gap-2">
                {items.map((item, idx) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "block px-4 py-3 rounded-md text-sm font-medium transition-colors",
                          isActive
                            ? "bg-zinc-800 text-white"
                            : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  )
}
