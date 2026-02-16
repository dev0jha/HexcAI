import { SidebarHeader } from "@/components/ui/sidebar"
import Logo from "@/components/Logo"
import { cn } from "@/lib/utils"

export function SidebarHeaderContent() {
   return (
      <SidebarHeader>
         <div className="relative flex h-16 items-center justify-center gap-3 bg-zinc-200/5 border-white/10 px-4 border-2 rounded-lg">
            <div
               className={cn(
                  "pointer-events-none absolute inset-0 rounded-[inherit]",
                  "bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.02)_2px,transparent_2px,transparent_6px)]"
               )}
            />
            <Logo />
         </div>
      </SidebarHeader>
   )
}
