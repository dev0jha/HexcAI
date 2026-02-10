"use client"

import { HistoryList } from "@/components/history/history-list"
import { mockAnalysisHistory } from "@/data/mock-data"

export default function HistoryPage() {
   {
      /*  Sort array using mock data  */
   }
   const sortedHistory = [...mockAnalysisHistory].sort(
      (a, b) => new Date(b.analyzedAt).getTime() - new Date(a.analyzedAt).getTime()
   )

   return (
      <div className="flex h-full w-full flex-col p-4 sm:p-6">
         <div className="mx-auto w-full max-w-4xl xl:max-w-6xl space-y-6 sm:space-y-8">
            <div className="flex flex-col gap-1">
               <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-100">
                  Analysis History
               </h1>
               <p className="text-sm text-zinc-400">
                  View your recent repository analyses sorted by date.
               </p>
            </div>

            <HistoryList analyses={sortedHistory} />
         </div>
      </div>
   )
}
