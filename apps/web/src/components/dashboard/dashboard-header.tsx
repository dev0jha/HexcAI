import Link from "next/link"
import { IconAnalyze, IconUser } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
   userName: string
   publicProfileUrl: string
}

export function DashboardHeader({ userName, publicProfileUrl }: DashboardHeaderProps) {
   return (
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
         <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
               Welcome back, <span className="text-neutral-50 px-2">{userName}</span>
            </h1>
            <p className="text-sm text-zinc-400">
               Here is what's happening with your profile today.
            </p>
         </div>
         <div className="flex items-center gap-3">
            <Link href={publicProfileUrl}>
               <Button
                  variant="outline"
                  className="border-zinc-800 text-shadow-background text-shadow-lg shadow-lg bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 hover:text-white border-2"
               >
                  <IconUser className="mr-2 h-4 w-4" />
                  Public Profile
               </Button>
            </Link>
            <Link href="/dashboard/analysis">
               <Button className="bg-neutral-300 text-shadow-md py-3 px-2 shadow-lg text-zinc-900 hover:bg-zinc-200">
                  <IconAnalyze className="mr-2 h-4 w-4" />
                  New Analysis
               </Button>
            </Link>
         </div>
      </header>
   )
}
