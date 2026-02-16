"use client"

import Link from "next/link"
import {
   IconBrandGithub,
   IconCircle,
   IconStar,
   IconClock,
   IconArrowRight,
   IconHistory,
   IconAnalyze,
   IconChevronRight,
} from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import type { AnalyzedRepo } from "@/types"
import { Button } from "@/components/ui/button"

interface HistoryListProps {
   analyses: AnalyzedRepo[]
}

function formatRelativeTime(date: Date): string {
   const now = new Date()
   const diffMs = now.getTime() - new Date(date).getTime()
   const diffMins = Math.floor(diffMs / (1000 * 60))
   const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

   if (diffMins < 1) return "just now"
   if (diffMins < 60) return `${diffMins}m ago`
   if (diffHours < 24) return `${diffHours}h ago`
   if (diffDays < 7) return `${diffDays}d ago`
   return new Date(date).toLocaleDateString()
}

function getScoreColor(score: number): string {
   if (score >= 90) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
   if (score >= 80) return "text-blue-400 bg-blue-500/10 border-blue-500/20"
   if (score >= 60) return "text-amber-400 bg-amber-500/10 border-amber-500/20"
   return "text-red-400 bg-red-500/10 border-red-500/20"
}

export function HistoryList({ analyses }: HistoryListProps) {
   if (analyses.length === 0) {
      return <EmptyState />
   }

   return (
      <div className="overflow-hidden rounded-xl border border-zinc-800 bg-neutral-800/20 backdrop-blur-sm">
         <ul className="divide-y divide-zinc-800/50">
            {analyses.map(analysis => (
               <li key={analysis.id}>
                  <Link
                     href={`/dashboard/history/${analysis.id}`}
                     className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 transition-all hover:bg-zinc-800/30"
                  >
                     <div className="min-w-0 flex-1 space-y-3">
                        <div className="flex items-center justify-between gap-2 sm:justify-start">
                           <div className="flex items-center gap-3">
                              <h3 className="truncate font-medium text-zinc-200 group-hover:text-white transition-colors">
                                 {analysis.name}
                              </h3>
                              <span className="hidden sm:inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-2 py-0.5 text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                                 Public
                              </span>
                           </div>

                           <span className="sm:hidden text-xs text-zinc-600">
                              {formatRelativeTime(analysis.analyzedAt)}
                           </span>
                        </div>

                        {analysis.description && (
                           <p className="line-clamp-1 text-sm text-zinc-500 group-hover:text-zinc-400">
                              {analysis.description}
                           </p>
                        )}

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
                           {/* Github Link */}
                           <div className="flex items-center gap-1.5 transition-colors group-hover:text-zinc-400">
                              <IconBrandGithub className="h-3.5 w-3.5" />
                              <span className="truncate max-w-37.5">
                                 {analysis.url.replace("https://github.com/", "")}
                              </span>
                           </div>

                           {/* Language */}
                           <div className="flex items-center gap-1.5">
                              <IconCircle className="h-2 w-2 fill-current text-indigo-500" />
                              <span>{analysis.language}</span>
                           </div>

                           {/* Stars */}
                           <div className="flex items-center gap-1.5">
                              <IconStar className="h-3.5 w-3.5" />
                              <span>{analysis.stars}</span>
                           </div>
                        </div>
                     </div>

                     {/* Right Side: Score & Action */}
                     <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-6 pl-0 sm:pl-4">
                        <div className="flex items-center gap-3">
                           <div className="flex flex-col items-end">
                              <span className="text-[10px] uppercase tracking-wider text-zinc-600 font-medium">
                                 Score
                              </span>
                              <div
                                 className={cn(
                                    "flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-sm font-semibold",
                                    getScoreColor(analysis.totalScore)
                                 )}
                              >
                                 {analysis.totalScore}
                              </div>
                           </div>
                        </div>

                        <div className="flex flex-col items-end gap-1 text-right">
                           <span className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-600">
                              <IconClock className="h-3 w-3" />
                              {formatRelativeTime(analysis.analyzedAt)}
                           </span>
                           <IconChevronRight className="-mr-1 h-5 w-5 text-zinc-700 transition-transform group-hover:translate-x-1 group-hover:text-zinc-400" />
                        </div>
                     </div>
                  </Link>
               </li>
            ))}
         </ul>
      </div>
   )
}

function EmptyState() {
   return (
      <div className="flex min-h-100 flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-neutral-800/30 p-8 text-center animate-in fade-in zoom-in-95 duration-500">
         <IconHistory className="h-8 w-8 text-zinc-500" />
         <h3 className="mt-6 text-lg font-semibold text-zinc-200">No analysis history</h3>
         <p className="mt-2 text-sm text-zinc-500 max-w-sm mx-auto">
            You haven't analyzed any repositories yet. Start your first analysis to see it here.
         </p>
         <Link href="/dashboard/analysis">
            <Button
               variant="outline"
               className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-zinc-50 px-6 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50"
            >
               <IconAnalyze />
               Analyze Repository
            </Button>
         </Link>
      </div>
   )
}
