"use client"

import { use } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"

import {
   IconArrowLeft,
   IconBrandGithub,
   IconCircle,
   IconStar,
   IconClock,
   IconCode,
   IconFileText,
   IconGitBranch,
   IconLayersOff,
   IconShield,
   IconExternalLink,
   IconChartPie,
   IconListCheck,
} from "@tabler/icons-react"

import ScorePieChart from "@/components/developer/score-pie-chart"
import { analysisQueries } from "@/lib/queries/queryOptions"
import { cn } from "@/lib/utils"
import type { ScoreBreakdown } from "@/types"
import { ChevronLeft } from "lucide-react"

const scoreCategories = [
   { key: "codeQuality" as keyof ScoreBreakdown, name: "Code Quality", icon: IconCode },
   { key: "architecture" as keyof ScoreBreakdown, name: "Architecture", icon: IconLayersOff },
   { key: "security" as keyof ScoreBreakdown, name: "Security", icon: IconShield },
   { key: "gitPractices" as keyof ScoreBreakdown, name: "Git Practices", icon: IconGitBranch },
   { key: "documentation" as keyof ScoreBreakdown, name: "Documentation", icon: IconFileText },
]

function getScoreColor(score: number): string {
   if (score >= 90) return "text-emerald-400 border-emerald-500/20"
   if (score >= 80) return "text-blue-400 border-blue-500/20"
   if (score >= 60) return "text-amber-400 border-amber-500/20"
   return "text-red-400 border-red-500/20"
}

function getProgressBarColor(score: number): string {
   if (score >= 90) return "bg-emerald-500"
   if (score >= 80) return "bg-blue-500"
   if (score >= 60) return "bg-amber-500"
   return "bg-red-500"
}

interface PageProps {
   params: Promise<{ analysisId: string }>
}

export default function AnalysisDetailPage({ params }: PageProps) {
   const { analysisId } = use(params)
   const { data, isLoading, error } = useQuery(analysisQueries.detail(analysisId))

   if (isLoading) {
      return <LoadingState />
   }

   if (error || !data?.success) {
      return <div>something went wrong</div>
   }

   const analysis = data.analysis

   return (
      <div className="flex h-full w-full flex-col">
         <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 space-y-8">
            <div>
               <Link
                  href="/dashboard/history"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-200 transition-colors border-2 p-2 rounded-md border-zinc-800/90 hover:border-zinc-800"
               >
                  <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
               </Link>
            </div>

            {/* Header Section */}
            <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between border-b border-zinc-800 pb-8">
               <div className="space-y-4">
                  <div className="space-y-2">
                     <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
                           {analysis.name}
                        </h1>
                        <span className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/50 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
                           Public
                        </span>
                     </div>
                     <p className="max-w-xl text-base text-zinc-400 leading-relaxed">
                        {analysis.description || "No description provided for this repository."}
                     </p>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                     <a
                        href={analysis.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                     >
                        <IconBrandGithub className="h-4 w-4" />
                        <span className="underline decoration-zinc-700 underline-offset-4 hover:decoration-white">
                           {analysis.url.replace("https://github.com/", "")}
                        </span>
                        <IconExternalLink className="h-3 w-3 opacity-50" />
                     </a>

                     <span className="h-1 w-1 rounded-full bg-zinc-800" />

                     <span className="flex items-center gap-1.5">
                        <IconCircle className="h-2 w-2 fill-current text-indigo-500" />
                        {analysis.language}
                     </span>

                     <span className="h-1 w-1 rounded-full bg-zinc-800" />

                     <span className="flex items-center gap-1.5">
                        <IconStar className="h-4 w-4 text-zinc-600" />
                        {analysis.stars}
                     </span>

                     <span className="h-1 w-1 rounded-full bg-zinc-800" />

                     <span className="flex items-center gap-1.5">
                        <IconClock className="h-4 w-4 text-zinc-600" />
                        {new Date(analysis.analyzedAt).toLocaleDateString("en-US", {
                           month: "short",
                           day: "numeric",
                           year: "numeric",
                        })}
                     </span>
                  </div>
               </div>

               {/* Overall Score Badge */}
               <div className="flex shrink-0 items-center gap-4 rounded-xl border border-zinc-800 bg-neutral-800/20 p-4 backdrop-blur-sm">
                  <div className="text-right">
                     <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">
                        Overall Score
                     </p>
                     <p className="text-xs text-zinc-600">Weighted Average</p>
                  </div>
                  <div
                     className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-lg text-lg font-bold shadow-sm",
                        getScoreColor(analysis.totalScore)
                     )}
                  >
                     {analysis.totalScore}
                  </div>
               </div>
            </header>

            {/* Analysis Content Grid */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
               {/* Left Column: Visuals & Breakdown */}
               <div className="lg:col-span-2 flex flex-col gap-8">
                  {/* Score Breakdown Container */}
                  <div className="overflow-hidden rounded-lg border-2 border-zinc-800/80 bg-neutral-800/20 backdrop-blur-sm">
                     <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/20 px-6 py-4">
                        <IconChartPie className="h-4 w-4 text-zinc-400" />
                        <h3 className="text-sm font-semibold text-zinc-200">Performance Metrics</h3>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Chart Side */}
                        <div className="flex items-center justify-center border-b border-zinc-800 p-8 md:border-b-0 md:border-r">
                           <ScorePieChart
                              scores={analysis.scores}
                              totalScore={analysis.totalScore}
                           />
                        </div>

                        {/* Breakdown Side (Separator List) */}
                        <div className="divide-y divide-zinc-800/50">
                           {scoreCategories.map(category => {
                              const score = analysis.scores[category.key]
                              return (
                                 <div
                                    key={category.key}
                                    className="flex flex-col gap-2 px-6 py-4 hover:bg-neutral-800/80 transition-colors"
                                 >
                                    <div className="flex items-center justify-between">
                                       <span className="flex items-center gap-2 text-sm text-zinc-400">
                                          <category.icon className="h-4 w-4 text-zinc-600" />
                                          {category.name}
                                       </span>
                                       <span className="font-mono text-sm font-medium text-zinc-200">
                                          {score}/100
                                       </span>
                                    </div>
                                    <div className="h-2 w-full rounded-md bg-neutral-500/10">
                                       <div
                                          className={cn(
                                             "h-full rounded-md transition-all duration-1000 ease-out",
                                             getProgressBarColor(score)
                                          )}
                                          style={{ width: `${score}%` }}
                                       />
                                    </div>
                                 </div>
                              )
                           })}
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right Column: Feedback */}
               <div className="lg:col-span-1">
                  <div className="h-full overflow-hidden rounded-lg border border-zinc-800 bg-neutral-800/20 backdrop-blur-sm">
                     <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/20 px-6 py-4">
                        <IconListCheck className="h-4 w-4 text-zinc-400" />
                        <h3 className="text-sm font-semibold text-zinc-200">Key Insights</h3>
                     </div>
                     <ul className="divide-y divide-zinc-800/50">
                        {analysis.feedback.slice(0, 3).map((item, index) => (
                           <li
                              key={index}
                              className="flex gap-3 px-6 py-4 text-sm leading-relaxed text-zinc-400 hover:bg-zinc-900/20 transition-colors"
                           >
                              <span className="mt-1.5 flex h-5 w-5 shrink-0 rounded-sm bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                              <span>{item}</span>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

function LoadingState() {
   return (
      <div className="flex h-full w-full flex-col">
         <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 space-y-8">
            <div>
               <Link
                  href="/dashboard/history"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-200 transition-colors"
               >
                  <IconArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to History
               </Link>
            </div>
            <div className="flex items-center justify-center h-64">
               <div className="text-zinc-500">Loading analysis...</div>
            </div>
         </div>
      </div>
   )
}
