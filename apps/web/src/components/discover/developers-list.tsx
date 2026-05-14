import { cn } from "@/lib/utils"
import { PodiumCard } from "./podium-card"
import { DeveloperRow } from "./developer-row"
import type { Developer } from "@/types"

interface DevelopersListProps {
   topDevelopers: Developer[]
   listDevelopers: Developer[]
   onContact: (developer: Developer) => void
   className?: string
}

export function DevelopersList({
   topDevelopers,
   listDevelopers,
   onContact,
   className,
}: DevelopersListProps) {
   return (
      <div className={cn("space-y-8", className)}>
         {/* --- Podium Section (Top 3) --- */}
         {topDevelopers.length > 0 && (
            <div className="grid gap-4 md:grid-cols-3 mb-8">
               {topDevelopers.map((dev, index) => (
                  <PodiumCard
                     key={dev.id}
                     developer={dev}
                     rank={index + 1}
                     onContact={() => onContact(dev)}
                  />
               ))}
            </div>
         )}

         {/* --- List Section (The Rest) --- */}
         {listDevelopers.length > 0 || topDevelopers.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/20">
               {/* Table Header */}
               {listDevelopers.length > 0 && (
                  <div className="grid grid-cols-12 items-center gap-4 border-b border-neutral-800 bg-neutral-900/50 px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                     <div className="col-span-1">Rank</div>
                     <div className="col-span-6 md:col-span-4">Developer</div>
                     <div className="col-span-3 hidden md:block">Tech Stack</div>
                     <div className="col-span-2 hidden md:block text-right">Score</div>
                     <div className="col-span-5 md:col-span-2 text-right">Action</div>
                  </div>
               )}

               {/* Table Body */}
               <div className="divide-y divide-neutral-800/50">
                  {listDevelopers.length > 0
                     ? listDevelopers.map((dev, index) => (
                          <DeveloperRow
                             key={dev.id}
                             developer={dev}
                             rank={index + 4}
                             onContact={() => onContact(dev)}
                          />
                       ))
                     : null}
               </div>
            </div>
         ) : (
            <div className="py-16 text-center text-sm text-neutral-500">
               No developers found matching your criteria.
            </div>
         )}
      </div>
   )
}
