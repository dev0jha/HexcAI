"use client";

import { useState } from "react";

import Link from "next/link";

import { Code2, Menu, X, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-border bg-background/80 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Code2 className="text-primary-foreground h-5 w-5" />
            </div>
            <span className="text-xl font-bold">DevScore</span>
            <span className="bg-primary/20 text-primary rounded px-1.5 py-0.5 text-xs font-medium">
              AI
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="/pricing"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              About
            </Link>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="gap-2">
                <Zap className="h-4 w-4" />
                Get Started
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="border-border border-t py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link
                href="/pricing"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <div className="flex flex-col gap-2 pt-4">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full gap-2">
                    <Zap className="h-4 w-4" />
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
