import { IconCode } from "@tabler/icons-react"
import { SidebarHeader } from "@/components/ui/sidebar"

export function SidebarHeaderContent() {
   return (
      <SidebarHeader>
         <div className="flex h-16 items-center justify-center gap-3 bg-zinc-200/5 border-white/10 px-4 border-2 rounded-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/10">
               <IconCode className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold tracking-tight text-white">HireXAI</span>
         </div>
      </SidebarHeader>
   )
}
