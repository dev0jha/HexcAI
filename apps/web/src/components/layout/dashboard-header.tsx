"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code2, Menu, X } from "lucide-react"

export function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-white/2 bg-[#121212] backdrop-blur-md md:left-64">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-zinc-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link href="/" className="flex items-center gap-2 md:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/10">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-white">HireXAI</span>
          </Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-white/5 p-4 md:hidden bg-[#121212]">
          <nav className="space-y-2">
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10"
              >
                Overview
              </Button>
            </Link>
            <Link href="/dashboard/analysis" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10"
              >
                Analyze Repo
              </Button>
            </Link>
            <Link href="/dashboard/requests" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10"
              >
                Requests
              </Button>
            </Link>
            <Link href="/dashboard/settings" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10"
              >
                Settings
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
