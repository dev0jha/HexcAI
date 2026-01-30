import type React from "react";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardSidebar } from "@/components/layout/sidebar/sidebar";
import {
  SidebarContent,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Sidebar } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="flex bg-[#121212]">
      <div className="relative flex min-h-screen bg-[#121212]">
        <Sidebar>
          <SidebarContent className="bg-[#121212]">
            <DashboardSidebar />
          </SidebarContent>
        </Sidebar>
      </div>

      <SidebarInset className="w-full gap-4 bg-[#121212] p-2 pt-20 sm:p-6 md:pt-6">
        <DashboardHeader />
        <div className="p-2 sm:p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
