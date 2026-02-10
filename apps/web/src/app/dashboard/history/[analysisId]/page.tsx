"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"

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
} from "@tabler/icons-react"

import { Card } from "@/components/ui/card"
import ScorePieChart from "@/components/developer/score-pie-chart"
import { mockAnalysisHistory } from "@/data/mock-data"
import { cn } from "@/lib/utils"
import type { ScoreBreakdown } from "@/types"

const scoreCategories = [
   { key: "codeQuality" as keyof ScoreBreakdown, name: "Code Quality", icon: IconCode },
   { key: "architecture" as keyof ScoreBreakdown, name: "Architecture", icon: IconLayersOff },
   { key: "security" as keyof ScoreBreakdown, name: "Security", icon: IconShield },
   { key: "gitPractices" as keyof ScoreBreakdown, name: "Git Practices", icon: IconGitBranch },
   { key: "documentation" as keyof ScoreBreakdown, name: "Documentation", icon: IconFileText },
]

function getScoreColor(score: number): string {
   if (score >= 90) return "text-emerald-400"
   if (score >= 80) return "text-blue-400"
   if (score >= 60) return "text-amber-400"
   return "text-red-400"
}

function getProgressColor(score: number): string {
   if (score >= 90) return "bg-emerald-400"
   if (score >= 80) return "bg-blue-400"
   if (score >= 60) return "bg-amber-400"
   return "bg-red-400"
}

interface PageProps {
   params: Promise<{ analysisId: string }>
}

export default function AnalysisDetailPage({ params }: PageProps) {
   const { analysisId } = use(params)

   const analysis = mockAnalysisHistory.find(a => a.id === analysisId)

   if (!analysis) {
      notFound()
   }

   return (
      <div className="flex h-full w-full flex-col p-4 sm:p-6">
         <div className="mx-auto w-full max-w-4xl xl:max-w-6xl space-y-6 sm:space-y-8">
            {/* Back Button */}
            <Link
               href="/dashboard/history"
               className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
               <IconArrowLeft className="h-4 w-4" />
               Back to History
            </Link>

            {/* Header */}
            <div className="space-y-4">
               <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                     <div className="flex items-center gap-3">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                           {analysis.name}
                        </h1>
                        <span className="rounded-full border border-zinc-800 bg-zinc-900/50 px-2.5 py-1 text-xs font-medium text-zinc-400">
                           Public
                        </span>
                     </div>

                     <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
                        <a
                           href={analysis.url}
                           target="_blank"
                           rel="noreferrer"
                           className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors"
                        >
                           <IconBrandGithub className="h-4 w-4 shrink-0" />
                           <span className="truncate">
                              {analysis.url.replace("https://github.com/", "")}
                           </span>
                           <IconExternalLink className="h-3.5 w-3.5 shrink-0" />
                        </a>
                        <span className="h-1 w-1 rounded-full bg-zinc-800 shrink-0" />
                        <span className="flex items-center gap-1.5 text-zinc-400">
                           <IconCircle className="h-2 w-2 fill-current text-indigo-500" />
                           {analysis.language}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-zinc-800 shrink-0" />
                        <span className="flex items-center gap-1.5 text-zinc-400">
                           <IconStar className="h-3.5 w-3.5" />
                           {analysis.stars}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-zinc-800 shrink-0" />
                        <span className="flex items-center gap-1.5 text-zinc-400">
                           <IconClock className="h-3.5 w-3.5" />
                           {new Date(analysis.analyzedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                           })}
                        </span>
                     </div>

                     {analysis.description && (
                        <p className="text-sm text-zinc-400">{analysis.description}</p>
                     )}
                  </div>

                  <div className="flex items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
                     <div className="text-center">
                        <p className="mb-1 text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
                           Overall Score
                        </p>
                        <span
                           className={cn("text-4xl font-bold", getScoreColor(analysis.totalScore))}
                        >
                           {analysis.totalScore}
                        </span>
                        <span className="text-sm text-zinc-600 font-medium">/100</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
               {/* Score Chart */}
               <Card className="border-zinc-800 bg-zinc-900/50 p-6">
                  <ScorePieChart scores={analysis.scores} totalScore={analysis.totalScore} />
               </Card>

               {/* Score Breakdown */}
               <Card className="border-zinc-800 bg-zinc-900/50 p-6">
                  <h3 className="mb-6 text-lg font-semibold text-white">Score Breakdown</h3>
                  <div className="space-y-5">
                     {scoreCategories.map(category => {
                        const score = analysis.scores[category.key]
                        return (
                           <div key={category.key} className="space-y-2">
                              <div className="flex items-center justify-between">
                                 <span className="flex items-center gap-2 text-sm text-zinc-400">
                                    <category.icon className="h-4 w-4 text-zinc-600" />
                                    {category.name}
                                 </span>
                                 <span
                                    className={cn("text-sm font-semibold", getScoreColor(score))}
                                 >
                                    {score}
                                 </span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-zinc-800">
                                 <div
                                    className={cn(
                                       "h-full rounded-full transition-all",
                                       getProgressColor(score)
                                    )}
                                    style={{ width: `${score}%` }}
                                 />
                              </div>
                           </div>
                        )
                     })}
                  </div>
               </Card>
            </div>

            {/* Feedback Section */}
            <Card className="border-zinc-800 bg-zinc-900/50 p-6">
               <h3 className="mb-4 text-lg font-semibold text-white">AI Feedback</h3>
               <ul className="space-y-3">
                  {analysis.feedback.map((item, index) => (
                     <li key={index} className="flex items-start gap-3 text-sm text-zinc-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                        {item}
                     </li>
                  ))}
               </ul>
            </Card>
         </div>
      </div>
   )
}
