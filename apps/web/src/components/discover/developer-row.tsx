import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Developer } from "@/types"

interface DeveloperRowProps {
   developer: Developer
   rank: number
   onContact: () => void
   className?: string
}

export function DeveloperRow({ developer, rank, onContact, className }: DeveloperRowProps) {
   return (
      <div
         className={cn(
            "group grid grid-cols-12 items-center gap-4 px-6 py-3 transition-colors hover:bg-neutral-900/40",
            className
         )}
      >
         {/* Rank */}
         <div className="col-span-1 font-mono text-xs text-neutral-600 group-hover:text-neutral-400">
            #{rank}
         </div>

         {/* Profile */}
         <div className="col-span-6 md:col-span-4 flex items-center gap-3">
            <Avatar className="h-8 w-8 rounded-full border border-neutral-800">
               <AvatarImage src={developer.avatar} />
               <AvatarFallback className="bg-neutral-900 text-[10px] text-neutral-500">
                  {developer.name[0]}
               </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
               <span className="text-sm font-medium text-neutral-300 group-hover:text-neutral-100 transition-colors">
                  {developer.name}
               </span>
               <span className="text-[10px] text-neutral-600 hidden sm:inline-block">
                  {developer.location || "Remote"}
               </span>
            </div>
         </div>

         {/* Tech Stack - Desktop Only */}
         <div className="col-span-3 hidden md:flex items-center gap-1.5">
            {developer.techStack.slice(0, 3).map(tech => (
               <Badge
                  key={tech}
                  variant="secondary"
                  className="rounded-md border-neutral-800/50 bg-neutral-900/50 px-1.5 py-0 text-[10px] font-medium text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300"
               >
                  {tech}
               </Badge>
            ))}
            {developer.techStack.length > 3 && (
               <span className="text-[10px] text-neutral-700">
                  +{developer.techStack.length - 3}
               </span>
            )}
         </div>

         {/* Score - Desktop Only */}
         <div className="col-span-2 hidden md:block text-right">
            <span
               className={cn(
                  "font-mono text-sm font-medium",
                  developer.score >= 90
                     ? "text-emerald-500/90"
                     : developer.score >= 80
                       ? "text-blue-500/90"
                       : "text-neutral-500"
               )}
            >
               {developer.score}
            </span>
         </div>

         {/* Action */}
         <div className="col-span-5 md:col-span-2 flex justify-end">
            <Button
               size="sm"
               variant="ghost"
               onClick={onContact}
               className="h-7 px-3 text-xs text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800"
            >
               <span className="hidden md:inline mr-1.5">Connect</span>
               <ArrowUpRight className="h-3 w-3" />
            </Button>
         </div>
      </div>
   )
}
