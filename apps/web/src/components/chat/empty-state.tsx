import { PatternBackground } from "@/components/pattern-background"
import { IconMessage } from "@tabler/icons-react"

export function MessagingEmptyState() {
   return (
      <div className="flex-1 hidden md:flex items-center justify-center relative">
         <PatternBackground />
         <div className="text-center relative z-10 max-w-sm px-6">
            <div className="w-16 h-16 bg-neutral-900/50 border border-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
               <IconMessage className="h-6 w-6 text-neutral-500" />
            </div>
            <h3 className="text-[16px] font-medium text-neutral-200 mb-2">No Interface Selected</h3>
            <p className="text-[14px] text-neutral-500 leading-relaxed">
               Select a conversation from the sidebar to view messages, or start a new connection
               from a candidate profile.
            </p>
         </div>
      </div>
   )
}
