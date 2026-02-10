"use client"

import Link from "next/link"

import {
   IconBrandGithub,
   IconCircle,
   IconStar,
   IconChevronRight,
   IconClock,
} from "@tabler/icons-react"

function formatRelativeTime(date: Date): string {
   const now = new Date()
   const diffMs = now.getTime() - new Date(date).getTime()
   const diffMins = Math.floor(diffMs / (1000 * 60))
   const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

   if (diffMins < 1) return "just now"
   if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`
   if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
   if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
   if (diffDays < 30)
      return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`
   return new Date(date).toLocaleDateString()
}

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { AnalyzedRepo } from "@/types"

interface HistoryListProps {
   analyses: AnalyzedRepo[]
}

function getScoreColor(score: number): string {
   if (score >= 90) return "text-emerald-400"
   if (score >= 80) return "text-blue-400"
   if (score >= 60) return "text-amber-400"
   return "text-red-400"
}

function getScoreBgColor(score: number): string {
   if (score >= 90) return "bg-emerald-400/10 border-emerald-400/20"
   if (score >= 80) return "bg-blue-400/10 border-blue-400/20"
   if (score >= 60) return "bg-amber-400/10 border-amber-400/20"
   return "bg-red-400/10 border-red-400/20"
}

export function HistoryList({ analyses }: HistoryListProps) {
   if (analyses.length === 0) {
      return (
         <Card className="border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <div className="mx-auto max-w-sm space-y-3">
               <IconClock className="mx-auto h-12 w-12 text-zinc-600" />
               <h3 className="text-lg font-medium text-zinc-300">No analysis history</h3>
               <p className="text-sm text-zinc-500">
                  Start analyzing repositories to build your history.
               </p>
               <Link
                  href="/dashboard/analysis"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition-colors"
               >
                  Analyze a Repository
                  <IconChevronRight className="h-4 w-4" />
               </Link>
            </div>
         </Card>
      )
   }

   return (
      <div className="flex flex-col gap-4">
         {analyses.map(analysis => (
            <Link key={analysis.id} href={`/dashboard/history/${analysis.id}`}>
               <Card className="group cursor-pointer border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900/80">
                  <div className="flex items-center justify-between gap-4">
                     <div className="min-w-0 flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                           <h3 className="truncate text-base font-semibold text-white group-hover:text-zinc-100">
                              {analysis.name}
                           </h3>
                           <span className="shrink-0 rounded-full border border-zinc-800 bg-zinc-900/50 px-2 py-0.5 text-xs font-medium text-zinc-400">
                              Public
                           </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                           <span className="flex items-center gap-1.5 truncate">
                              <IconBrandGithub className="h-3.5 w-3.5 shrink-0" />
                              <span className="truncate">
                                 {analysis.url.replace("https://github.com/", "")}
                              </span>
                           </span>
                           <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-800" />
                           <span className="flex items-center gap-1.5 text-zinc-400">
                              <IconCircle className="h-2 w-2 fill-current text-indigo-500" />
                              {analysis.language}
                           </span>
                           <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-800" />
                           <span className="flex items-center gap-1.5 text-zinc-400">
                              <IconStar className="h-3.5 w-3.5" />
                              {analysis.stars}
                           </span>
                           <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-800" />
                           <span className="flex items-center gap-1.5 text-zinc-400">
                              <IconClock className="h-3.5 w-3.5" />
                              {formatRelativeTime(analysis.analyzedAt)}
                           </span>
                        </div>

                        {analysis.description && (
                           <p className="truncate text-sm text-zinc-500">{analysis.description}</p>
                        )}
                     </div>

                     <div className="flex shrink-0 items-center gap-4">
                        <div
                           className={cn(
                              "flex h-14 w-14 items-center justify-center rounded-xl border",
                              getScoreBgColor(analysis.totalScore)
                           )}
                        >
                           <span
                              className={cn(
                                 "text-xl font-bold",
                                 getScoreColor(analysis.totalScore)
                              )}
                           >
                              {analysis.totalScore}
                           </span>
                        </div>
                        <IconChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                     </div>
                  </div>
               </Card>
            </Link>
         ))}
      </div>
   )
}
