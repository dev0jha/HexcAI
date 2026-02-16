"use client"

import { IconBrandGithub, IconLoader2, IconAnalyzeFilled } from "@tabler/icons-react"
import { useAnalysisActions, useAnalysisState } from "@/hooks/screens/analysis.hooks"
import { cn } from "@/lib/utils"
import { StatusStreamer } from "@/components/analysis/status-streamer"
import { Separator } from "@/components/ui/separator"

export function AnalysisInputTrigger() {
   const { isAnalyzing, state } = useAnalysisState()
   const { handleAnalyze, repoUrl, setRepoURL } = useAnalysisActions()

   return (
      <div className="relative w-full pt-4 pb-0">
         <form onSubmit={handleAnalyze} className="relative group w-full z-20">
            <div
               className={cn(
                  "flex h-14 w-full items-center gap-3 rounded-xl border bg-zinc-900/90 px-4 transition-all duration-300 backdrop-blur-xl",
                  isAnalyzing
                     ? "border-zinc-700 shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)]"
                     : "border-zinc-800 hover:border-zinc-700 focus-within:border-zinc-600 focus-within:ring-2 focus-within:ring-zinc-700/50"
               )}
            >
               <IconBrandGithub
                  className={cn(
                     "h-5 w-5 transition-colors",
                     isAnalyzing ? "text-indigo-400" : "text-zinc-500"
                  )}
               />

               <input
                  id="repo-url"
                  type="url"
                  autoComplete="off"
                  placeholder="https://github.com/username/project"
                  className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none"
                  value={repoUrl}
                  onChange={e => setRepoURL(e.target.value)}
                  disabled={isAnalyzing}
               />

               <button
                  type="submit"
                  disabled={isAnalyzing || !repoUrl}
                  className={cn(
                     "flex h-8 items-center gap-2 rounded-lg px-2 sm:px-3 text-xs font-medium transition-all duration-300 whitespace-nowrap",
                     !repoUrl || isAnalyzing
                        ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        : "bg-zinc-100 text-zinc-900 hover:bg-white hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)]"
                  )}
               >
                  {isAnalyzing ? (
                     <div className="flex items-center gap-2">
                        <IconLoader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Processing</span>
                     </div>
                  ) : (
                     <>
                        <span>Analyze</span>
                        <IconAnalyzeFilled className="h-3.5 w-3.5" />
                     </>
                  )}
               </button>
            </div>
         </form>

         {state.status === "responding" && (
            <div className="relative z-10 min-h-10">
               <div className="animate-in slide-in-from-top-2 fade-in duration-500 absolute inset-0 flex items-center justify-start gap-2">
                  <Separator orientation="vertical" />
                  <StatusStreamer statusText={state.currentStatus} />
               </div>
            </div>
         )}
      </div>
   )
}
