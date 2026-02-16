"use client"

import Link from "next/link"
import { IconAnalyze, IconCode, IconEye, IconSearch, IconUser } from "@tabler/icons-react"

import { DeveloperRadarChart } from "@/components/discover/radar-chart"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { DashboardRequests } from "@/components/dashboard/dashboard-requests"
import { mockDevelopers } from "@/data/mock-data"
import type { Developer } from "@/types"
import { useReactiveSession } from "@/lib/auth-client"

function getDeveloperStats(developer: Developer) {
   return [
      { label: "Profile Views", value: "1,204", trend: "+12%", icon: IconEye },
      { label: "Search Appearances", value: "342", trend: "+5%", icon: IconSearch },
      { label: "Code Score", value: developer.score, trend: "+2", icon: IconCode },
   ]
}

export default function DashboardPage() {
   const { session } = useReactiveSession()

   const developer = mockDevelopers[0]
   const stats = getDeveloperStats(developer)

   return (
      <div className="flex h-full w-full flex-col">
         <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 space-y-8">
            {/* Header */}
            <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
               <div className="space-y-1">
                  <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
                     Welcome back,{" "}
                     <span className="text-neutral-50 px-2">
                        {session?.user.name.split(" ")[0]}
                     </span>
                  </h1>
                  <p className="text-sm text-zinc-400">
                     Here is what's happening with your profile today.
                  </p>
               </div>
               <div className="flex items-center gap-3">
                  <Link href={`/profile/${developer.username}`}>
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

            {/* Stats Overview */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
               {stats.map(stat => (
                  <div
                     key={stat.label}
                     className="relative overflow-hidden rounded-xl border border-zinc-800 bg-neutral-800/20 p-6 backdrop-blur-sm transition-all hover:bg-zinc-900/40"
                  >
                     <div className="flex items-center justify-between">
                        <div className="space-y-1">
                           <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                              {stat.label}
                           </p>
                           <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-bold text-zinc-100">{stat.value}</span>
                              <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                                 {stat.trend}
                              </span>
                           </div>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400">
                           <stat.icon className="h-5 w-5" />
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
               <div className="space-y-8 lg:col-span-2">
                  <div className="rounded-xl border border-zinc-800 bg-neutral-800/20 backdrop-blur-sm">
                     <div className="border-zinc-800 px-6 py-4">
                        <h3 className="text-base font-semibold text-zinc-100">Competency Matrix</h3>
                        <p className="text-sm text-zinc-500">
                           Visual breakdown of your engineering strengths.
                        </p>
                     </div>
                     <div className="flex items-center justify-center p-6 py-11">
                        <div className="h-75 w-full">
                           <DeveloperRadarChart />
                        </div>
                     </div>
                  </div>
               </div>

               {/* RIGHT COLUMN (1/3) */}
               <div className="space-y-8 lg:col-span-1">
                  {/* Status Card */}
                  <div className="rounded-xl border border-zinc-800 bg-neutral-800/20 p-6 backdrop-blur-sm">
                     <div className="flex items-center justify-between mb-6">
                        <div className="space-y-1">
                           <h3 className="font-medium text-zinc-100">Open to Recruiters</h3>
                           <p className="text-xs text-zinc-500">Visible in search results</p>
                        </div>
                        <Switch
                           checked={developer.isOpenToRecruiters}
                           className="data-[state=checked]:bg-emerald-500"
                        />
                     </div>

                     <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                           <span className="text-zinc-400">Profile Completeness</span>
                           <span className="text-zinc-200 font-medium">92%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-zinc-800">
                           <div className="h-full w-[92%] rounded-full bg-indigo-500" />
                        </div>
                     </div>
                  </div>

                  {/* Requests / Inbox */}
                  <DashboardRequests />
               </div>
            </div>
         </div>
      </div>
   )
}
