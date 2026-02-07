import RoleBadge from "@/components/core/role-indicator"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { IconCode } from "@tabler/icons-react"

export function DashboardHeader() {
   return (
      <header className="w-full px-6 sticky top-5 flex gap-2 flex-col">
         <div className="flex items-center">
            <SidebarTrigger className="bg-white/4 p-0 text-white">
               <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10 transition hover:bg-white/20">
                  <IconCode className="h-5 w-5 text-white" />
               </div>
            </SidebarTrigger>

            <Separator orientation="vertical" className="ml-2" />

            <div className="ml-auto">
               <RoleBadge />
            </div>
         </div>
      </header>
   )
}
