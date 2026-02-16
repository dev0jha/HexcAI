"use client"

import { useQuery } from "@tanstack/react-query"

import { HistoryList } from "@/components/history/history-list"
import { analysisQueries } from "@/lib/queries/queryOptions"

export default function HistoryPage() {
   const { data, isLoading } = useQuery(analysisQueries.list())

   const sortedHistory = data?.analyses
      ? [...data.analyses].sort(
           (a, b) => new Date(b.analyzedAt).getTime() - new Date(a.analyzedAt).getTime()
        )
      : []

   return (
      <div className="flex h-full w-full flex-col p-4 sm:p-6">
         <div className="mx-auto w-full py-8">
            <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
               <div className="space-y-1">
                  <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
                     Analysis History
                  </h1>
                  <p className="text-sm text-zinc-400">
                     View and manage your recent repository analyses.
                  </p>
               </div>

               <div className="text-xs font-medium text-zinc-600 uppercase tracking-widest">
                  {isLoading ? "Loading..." : `${sortedHistory.length} Repositories`}
               </div>
            </header>

            <HistoryList analyses={sortedHistory} />
         </div>
      </div>
   )
}
