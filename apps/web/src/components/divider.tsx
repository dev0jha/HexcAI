import { cn } from "@/lib/utils"
import { PlusIcon } from "@/components/ui/plus-icon"

export function Divider({ className }: { className?: string }) {
   return (
      <div className={cn("relative h-px w-full", className)}>
         <div className="absolute inset-0 border-3 border-neutral-700/85 h-11 border-dashed" />
         <PlusIcon className="absolute -left-1.5 top-1/2 -translate-y-1/2 text-white/50" />
         <PlusIcon className="absolute -right-1.5 top-1/2 -translate-y-1/2 text-white/50" />
      </div>
   )
}
