"use client"

import { useState } from "react"

import Link from "next/link"

import { Clock, Eye, Menu, TrendingUp, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function DashboardHeader() {
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

   return (
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/5 bg-[#121212]/80 backdrop-blur-md md:left-64">
         <div className="flex h-16 items-center justify-between gap-6 px-4 md:px-6">
            {/* LEFT — Context */}
            <div className="flex min-w-0 items-center gap-4">
               <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-400 md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
               >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
               </Button>
            </div>

            {/* CENTER — Micro Stats */}
            <div className="hidden items-center gap-6 text-xs text-zinc-400 lg:flex">
               <div className="flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Score:</span>
                  <span className="font-medium text-white">94</span>
               </div>

               <div className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  <span>Views (7d):</span>
                  <span className="font-medium text-white">18</span>
               </div>

               <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Updated:</span>
                  <span className="font-medium text-white">2h ago</span>
               </div>
            </div>

            {/* RIGHT — Primary Action */}
            <div className="flex items-center gap-2">
               <Button size="sm" className="bg-white text-black hover:bg-white/90">
                  Analyze New Repo
               </Button>
            </div>
         </div>

         {/* MOBILE MENU */}
         {mobileMenuOpen && (
            <div className="border-t border-white/5 bg-[#121212] p-4 md:hidden">
               <nav className="space-y-2">
                  {[
                     ["Overview", "/dashboard"],
                     ["Analyze Repo", "/dashboard/analysis"],
                     ["Requests", "/dashboard/requests"],
                     ["Settings", "/dashboard/settings"],
                  ].map(([label, href]) => (
                     <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)}>
                        <Button
                           variant="ghost"
                           className="w-full justify-start text-zinc-400 hover:bg-white/10 hover:text-white"
                        >
                           {label}
                        </Button>
                     </Link>
                  ))}
               </nav>
            </div>
         )}
      </header>
   )
}
