import Link from "next/link";

import { IconCode } from "@tabler/icons-react";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function SidebarHeader({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
      <Link href="/" className="flex items-center gap-2">
        {collapsed ? (
          <SidebarTrigger className="bg-transparent p-0 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 transition hover:bg-white/20">
              <IconCode className="h-5 w-5 text-white" />
            </div>
          </SidebarTrigger>
        ) : (
          <>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10">
              <IconCode className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-white">
              HireXAI
            </span>
          </>
        )}
      </Link>

      {!collapsed && (
        <SidebarTrigger className="rounded-md bg-transparent stroke-3 font-bold text-white" />
      )}
    </div>
  );
}
