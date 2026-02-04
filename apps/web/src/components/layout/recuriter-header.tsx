"use client"

import { useState } from "react"

import Link from "next/link"
import {  Code2,  Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function RecruiterHeader() {
   const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
   return (
      <header className="border-border bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md md:left-64">
         <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-4">
               <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
               >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
               </Button>
               <Link href="/" className="flex items-center gap-2 md:hidden">
                  <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                     <Code2 className="text-primary-foreground h-5 w-5" />
                  </div>
                  <span className="font-bold">HireXAI</span>
                  <span className="bg-primary/20 text-primary rounded px-1.5 py-0.5 text-xs font-medium">
                     AI
                  </span>
               </Link>
            </div>

            <div className="flex flex-1 items-center justify-end">
               <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
               >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
               </Button>
            </div>
         </div>

         {mobileMenuOpen && (
            <div className="border-border border-t p-4 md:hidden">
               <nav className="space-y-2">
                  <Link href="/recruiter/discover" onClick={() => setMobileMenuOpen(false)}>
                     <Button variant="ghost" className="w-full justify-start">
                        Discover
                     </Button>
                  </Link>
                  <Link href="/recruiter/candidates" onClick={() => setMobileMenuOpen(false)}>
                     <Button variant="ghost" className="w-full justify-start">
                        My Candidates
                     </Button>
                  </Link>
               </nav>
            </div>
         )}
      </header>
   )
}
