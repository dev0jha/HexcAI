"use client"

import { useEffect } from "react"

export default function RootError({
   error,
   reset,
}: {
   error: Error & { digest?: string }
   reset: () => void
}) {
   useEffect(() => {
      console.error("Application error:", error)
   }, [error])

   return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-[#121212] px-4">
         <div className="text-destructive text-6xl">!</div>
         <h1 className="text-2xl font-semibold text-zinc-100">Something went wrong</h1>
         <p className="max-w-md text-center text-zinc-400">{error.message}</p>
         <button
            onClick={reset}
            className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
         >
            Try again
         </button>
      </div>
   )
}
