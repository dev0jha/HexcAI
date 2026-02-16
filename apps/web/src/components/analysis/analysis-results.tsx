"use client"

import {
   IconCode,
   IconFileText,
   IconGitBranch,
   IconLayersOff,
   IconShield,
   IconBrandGithub,
   IconStar,
   IconCircle,
   IconX,
} from "@tabler/icons-react"
import { motion, Variants } from "motion/react"

import AnalysisCanvas from "@/components/analysis/analysis-canvas"
import { useAnalysisInput, useAnalysisState } from "@/hooks/screens/analysis.hooks"
import { cn } from "@/lib/utils"

const scoreCategories = [
   { name: "Code Quality", icon: IconCode },
   { name: "Architecture", icon: IconLayersOff },
   { name: "Security", icon: IconShield },
   { name: "Git Practices", icon: IconGitBranch },
   { name: "Documentation", icon: IconFileText },
]

const containerVariants: Variants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.05,
         delayChildren: 0.1,
      },
   },
}

const itemVariants: Variants = {
   hidden: { opacity: 0, y: 10 },
   visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
   },
}

const lineVariants: Variants = {
   hidden: { scaleX: 0, opacity: 0 },
   visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "circOut" },
   },
}

export function Results() {
   const { state, isComplete, scoreValues, setState } = useAnalysisState()

   if (!isComplete || state.status !== "complete") return null

   return (
      <motion.div
         variants={containerVariants}
         initial="hidden"
         animate="visible"
         className="mx-auto max-w-6xl xl:max-w-full pb-2 sm:pb-1 px-0 sm:px-8 lg:px-16 xl:px-44"
      >
         <div className="relative mb-8 px-4">
            <div className="w-full flex items-center justify-end gap-4">
               <button
                  onClick={() => {
                     setState({ status: "idle" })
                  }}
                  className="flex h-8 w-8 items-center justify-center border-2 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors bg-neutral-500/10"
                  aria-label="Close results"
               >
                  <IconX className="h-4 w-4" />
               </button>
            </div>

            <motion.div
               variants={itemVariants}
               className="flex flex-col items-start justify-between gap-6 pb-6 lg:flex-row lg:items-end lg:gap-0"
            >
               <div className="space-y-2">
                  <div className="flex items-center gap-3">
                     <h2 className="text-3xl font-bold tracking-tight text-white">
                        {state.result.name}
                     </h2>
                     <span className="rounded-full border border-zinc-800 bg-zinc-900/50 px-2.5 py-1 text-xs font-medium text-zinc-400">
                        Public
                     </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-500">
                     <a
                        href={state.result.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors truncate max-w-full"
                     >
                        <IconBrandGithub className="h-4 w-4 shrink-0" />
                        <span className="truncate">
                           {state.result.url.replace("https://github.com/", "")}
                        </span>
                     </a>
                     <span className="h-1 w-1 rounded-full bg-zinc-800 shrink-0" />
                     <span className="flex items-center gap-1.5 text-zinc-400 text-xs">
                        <IconCircle className="h-2 w-2 fill-current text-indigo-500" />
                        {state.result.language}
                     </span>
                     <span className="h-1 w-1 rounded-full bg-zinc-800 shrink-0" />
                     <span className="flex items-center gap-1.5 text-zinc-400">
                        <IconStar className="h-3.5 w-3.5" />
                        {state.result.stars}
                     </span>
                  </div>
               </div>

               {/* Score Counter */}
               <div className="flex items-end gap-3">
                  <div className="text-right">
                     <p className="mb-1 text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
                        Overall Score
                     </p>
                     <div className="flex items-baseline justify-end gap-1">
                        <AnimatedCounter value={state.result.totalScore} />
                        <span className="text-xs sm:text-sm text-zinc-600 font-medium">/100</span>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Header Separator Line */}
            <motion.div
               variants={lineVariants}
               className="h-px w-full bg-zinc-800/50 origin-left"
            />
         </div>

         {/* 2. Main Layout (Grid) */}
         <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-12">
            <motion.div
               variants={itemVariants}
               className="relative lg:col-span-8 overflow-hidden rounded-lg"
            >
               <AnalysisCanvas analysisResult={state.result} />
            </motion.div>

            <div className="flex flex-col gap-8 lg:gap-10 lg:col-span-4 lg:py-2">
               <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-500">
                     Performance Breakdown
                  </h3>
                  <div className="space-y-4 sm:space-y-5">
                     {scoreCategories.map((category, index) => (
                        <div key={category.name} className="group">
                           <div className="mb-2 flex items-center justify-between">
                              <span className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                 <category.icon className="h-4 w-4 text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0" />
                                 <span className="truncate">{category.name}</span>
                              </span>
                              <span className="font-mono text-xs sm:text-sm font-medium text-zinc-300">
                                 {scoreValues[index]}
                              </span>
                           </div>
                           {/* Slim Progress Bar */}
                           <div className="h-2 w-full overflow-hidden rounded-md bg-zinc-800/50">
                              <motion.div
                                 initial={{ width: 0 }}
                                 animate={{ width: `${scoreValues[index]}%` }}
                                 transition={{
                                    duration: 1,
                                    delay: 0.5 + index * 0.1,
                                    ease: "circOut",
                                 }}
                                 className={cn(
                                    "h-full rounded-md",
                                    scoreValues[index] >= 80
                                       ? "bg-emerald-500/80"
                                       : scoreValues[index] >= 50
                                         ? "bg-amber-500/80"
                                         : "bg-rose-500/80"
                                 )}
                              />
                           </div>
                        </div>
                     ))}
                  </div>
               </motion.div>

               {/* Separator */}
               <motion.div
                  variants={lineVariants}
                  className="h-px w-full bg-zinc-800/50 origin-left"
               />

               {/* Insights Section */}
               <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                     Key Insights
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                     {state.result.feedback.slice(0, 3).map((item: string, index: number) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: 0.8 + index * 0.1 }}
                           className="flex gap-3 sm:gap-4"
                        >
                           <div className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900">
                              <div
                                 className={cn(
                                    "h-1.5 w-1.5 rounded-full",
                                    index === 0 ? "bg-indigo-500" : "bg-zinc-500"
                                 )}
                              />
                           </div>
                           <p className="text-xs sm:text-sm leading-relaxed text-zinc-400">
                              {item}
                           </p>
                        </motion.div>
                     ))}
                  </div>
               </motion.div>
            </div>
         </div>
      </motion.div>
   )
}

function CornerMarkers() {
   return (
      <div className="pointer-events-none absolute inset-0 z-20 opacity-50">
         <div className="absolute left-0 top-0 h-4 w-px bg-zinc-700" />
         <div className="absolute left-0 top-0 h-px w-4 bg-zinc-700" />

         <div className="absolute right-0 top-0 h-4 w-px bg-zinc-700" />
         <div className="absolute right-0 top-0 h-px w-4 bg-zinc-700" />

         <div className="absolute bottom-0 left-0 h-4 w-px bg-zinc-700" />
         <div className="absolute bottom-0 left-0 h-px w-4 bg-zinc-700" />

         <div className="absolute bottom-0 right-0 h-4 w-px bg-zinc-700" />
         <div className="absolute bottom-0 right-0 h-px w-4 bg-zinc-700" />
      </div>
   )
}

function AnimatedCounter({ value }: { value: number }) {
   return (
      <motion.span
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-white"
      >
         {value}
      </motion.span>
   )
}
