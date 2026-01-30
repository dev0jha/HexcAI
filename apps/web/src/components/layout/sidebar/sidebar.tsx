"use client";

import { SiderbarFooter } from "@/components/layout/sidebar/sidebar-footer";
import { SidebarHeader } from "@/components/layout/sidebar/sidebar-header";
import { MainContent } from "@/components/layout/sidebar/sidebar-maincontent";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const { open } = useSidebar();

  const collapsed = !open;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 hidden h-screen overflow-hidden border border-r border-[#2c2c2c] bg-[#191919] shadow-xl transition-all duration-300 md:block",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* keader */}
        <SidebarHeader collapsed={collapsed} />
        {/* Nav */}
        <MainContent collapsed={collapsed} />
        {/* Footer */}
        <SiderbarFooter collapsed={collapsed} />
      </div>
    </aside>
  );
}
