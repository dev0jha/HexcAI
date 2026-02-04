"use client"

import { useState } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "@/components/ui/plus-icon"
import { cn } from "@/lib/utils"

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
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
   const pathname = usePathname()

   return (
      <div className={cn("fixed top-0 right-0 left-0 z-50", className)}>
         <header className="relative w-full border-b border-white/5 bg-black/10">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 backdrop-blur-md sm:px-6">
               <PlusIcon className="absolute -bottom-1.5 -left-1.5 text-white/30" />
               <PlusIcon className="absolute -right-1.5 -bottom-1.5 text-white/30" />
               <div className="flex items-center gap-2">
                  <Link href="/" className="group flex items-center gap-2">
                     <span className="text-lg font-bold tracking-tight text-white">HireXAI</span>
                  </Link>
               </div>

               <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                  <ul className="flex items-center gap-1 rounded-lg border-[1.5] border-dashed border-white/10 px-2 py-1">
                     {items.map((item, idx) => {
                        const isActive =
                           pathname === item.href ||
                           (item.href !== "/" && pathname?.startsWith(item.href))

                        return (
                           <li key={idx}>
                              <Link
                                 href={item.href}
                                 className={cn(
                                    "relative block rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200",
                                    isActive
                                       ? "font-bold text-white"
                                       : "text-zinc-400 hover:text-zinc-100"
                                 )}
                              >
                                 {isActive && (
                                    <div className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-zinc-800/80 shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
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
                     <Button
                        className={cn(
                           "relative hidden items-center justify-center px-4 py-1.5 sm:flex",
                           "text-shadow-xl rounded-md text-sm font-medium tracking-wide shadow-lg transition-all duration-300 text-shadow-black/70",
                           "bg-white text-black hover:bg-zinc-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                        )}
                     >
                        Login
                     </Button>
                  </Link>

                  <button
                     className="p-2 text-zinc-400 transition-colors hover:text-white md:hidden"
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
                     className="overflow-hidden border-b border-white/10 bg-black md:hidden"
                  >
                     <ul className="flex flex-col gap-2 p-4">
                        {items.map((item, idx) => {
                           const isActive = pathname === item.href
                           return (
                              <li key={idx}>
                                 <Link
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                       "block rounded-md px-4 py-3 text-sm font-medium transition-colors",
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
