"use client";

import { useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  ChevronLeft,
  ChevronRight,
  Code2,
  LogOut,
  Search,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/recruiter/discover", label: "Discover", icon: Search },
  { href: "/recruiter/candidates", label: "My Candidates", icon: Users },
];

export function RecruiterSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

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
    <aside
      className={cn(
        "border-border bg-sidebar fixed top-0 left-0 z-40 hidden h-screen border-r transition-all duration-300 md:block",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="border-sidebar-border flex h-16 items-center justify-between border-b px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Code2 className="text-primary-foreground h-5 w-5" />
            </div>
            {!collapsed && (
              <>
                <span className="font-bold">HireXAI</span>
                <span className="bg-primary/20 text-primary rounded px-1.5 py-0.5 text-xs font-medium">
                  AI
                </span>
              </>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="hidden h-8 w-8 md:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  collapsed && "justify-center px-2"
                )}
              >
                <item.icon className="h-4 w-4" />
                {!collapsed && item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="border-sidebar-border border-t p-4">
          <div
            className={cn(
              "flex items-center gap-3",
              collapsed && "justify-center"
            )}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage
                src="/recruiter-portrait-male-professional.jpg"
                alt="John Smith"
              />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">John Smith</p>
                <p className="text-muted-foreground truncate text-xs">
                  TechCorp
                </p>
              </div>
            )}
            {!collapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleSignout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
