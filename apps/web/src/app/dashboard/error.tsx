"use client"

import { useEffect } from "react"

export default function DashboardError({
   error,
   reset,
}: {
   error: Error & { digest?: string }
   reset: () => void
}) {
   useEffect(() => {
      console.error("Dashboard error:", error)
   }, [error])

   return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8">
         <h2 className="text-xl font-semibold text-zinc-100">Dashboard error</h2>
         <p className="max-w-md text-center text-zinc-400">{error.message}</p>
         <button
            onClick={reset}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
         >
            Try again
         </button>
      </div>
   )
}
