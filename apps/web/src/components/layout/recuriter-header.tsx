"use client";

import { useState } from "react";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Building2,
  Code2,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";

export function RecruiterHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const isDark = theme === "dark";

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

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
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src="/recruiter-portrait-male-professional.jpg"
                  alt="John Smith"
                />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">John Smith</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              TechCorp
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex cursor-pointer items-center gap-2"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </DropdownMenuItem>{" "}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignout}
              className="text-destructive flex cursor-pointer items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {mobileMenuOpen && (
        <div className="border-border border-t p-4 md:hidden">
          <nav className="space-y-2">
            <Link
              href="/recruiter/discover"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button variant="ghost" className="w-full justify-start">
                Discover
              </Button>
            </Link>
            <Link
              href="/recruiter/candidates"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button variant="ghost" className="w-full justify-start">
                My Candidates
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
