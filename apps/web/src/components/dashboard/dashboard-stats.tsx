import { IconCode, IconEye, IconSearch } from "@tabler/icons-react"
import type { DashboardStats as DashboardStatsType } from "@/hooks/screens/dashboard.hooks"

interface DashboardStatsProps {
   stats: DashboardStatsType[]
}

export function DashboardStats({ stats }: DashboardStatsProps) {
   return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
         {stats.map(stat => (
            <div
               key={stat.label}
               className="relative overflow-hidden rounded-xl border border-zinc-800 bg-neutral-800/20 p-6 backdrop-blur-sm transition-all hover:bg-zinc-900/40"
            >
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        {stat.label}
                     </p>
                     <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-zinc-100">{stat.value}</span>
                        <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                           {stat.trend}
                        </span>
                     </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400">
                     <stat.icon className="h-5 w-5" />
                  </div>
               </div>
            </div>
         ))}
      </div>
   )
}

export function DashboardStatsSkeleton() {
   return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
         {[1, 2, 3].map(i => (
            <div key={i} className="h-32 animate-pulse bg-zinc-800/50 rounded-xl" />
         ))}
      </div>
   )
}
