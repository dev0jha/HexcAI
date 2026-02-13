"use client"

import { AnalysisInputTrigger } from "@/components/analysis/analysis-input"
import { Results } from "@/components/analysis/analysis-results"
import { AnalysisStore } from "@/hooks/scopedstores/analysis.store"

export default function AnalyzePage() {
   return (
      <AnalysisStore.Provider>
         <div className="flex h-full w-full flex-col p-4 sm:p-6">
            <div className="mx-auto w-full max-w-4xl xl:max-w-6xl space-y-6 sm:space-y-8">
               <div className="flex flex-col gap-1">
                  <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-100">
                     Analyze Repository
                  </h1>
                  <p className="text-sm text-zinc-400">
                     Enter a GitHub URL to generate a comprehensive quality report.
                  </p>
               </div>

               <div className="w-full px-0 sm:px-8 lg:px-16 xl:px-44">
                  <AnalysisInputTrigger />
               </div>

               <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <Results />
               </div>
            </div>
         </div>
      </AnalysisStore.Provider>
   )
}
