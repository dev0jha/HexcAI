import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LeaderboardWithData } from "@/components/leaderboard/leaderboard"

export default function LeaderboardPage() {
   return (
      <div className="min-h-screen bg-[#121212] text-zinc-100">
         <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between mb-8 px-3">
               <Button
                  variant="ghost"
                  size="sm"
                  className="group h-9 px-3 -ml-3 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/50 rounded-sm transition-all"
               >
                  <Link href="/" className="flex items-center gap-1">
                     <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                     <span className="font-medium">Back</span>
                  </Link>
               </Button>

               <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-zinc-600">
                  <span className="hover:text-zinc-400 transition-colors cursor-default">Home</span>
                  <ChevronRight className="h-3 w-3 text-zinc-700" />
                  <span className="text-zinc-400">Leaderboard</span>
               </div>
            </nav>

            <LeaderboardWithData />
         </div>
      </div>
   )
}
