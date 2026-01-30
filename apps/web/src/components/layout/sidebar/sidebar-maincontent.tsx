"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  IconInbox,
  IconLayout,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react";

import { SidebarContent } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: IconLayout },
  { href: "/dashboard/analysis", label: "Analyze Repo", icon: IconSearch },
  { href: "/dashboard/requests", label: "Requests", icon: IconInbox },
  { href: "/dashboard/settings", label: "Settings", icon: IconSettings },
];

export function MainContent({ collapsed }: { collapsed?: boolean }) {
  const pathname = usePathname();

  return (
    <SidebarContent>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item, idx) => {
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href + "/") &&
              item.href !== "/dashboard");

          return (
            <Link key={`${idx}-${item.href}`} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                  collapsed && "justify-center px-2",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </SidebarContent>
  );
}
