"use client"

import Link from "next/link"
import {
   IconAnalyze,
   IconArrowUpRight,
   IconBriefcase,
   IconCheck,
   IconCode,
   IconEye,
   IconSearch,
   IconUser,
   IconX,
} from "@tabler/icons-react"

import { DeveloperRadarChart } from "@/components/discover/radar-chart"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { mockContactRequests, mockDevelopers } from "@/data/mock-data"
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
   const pendingRequests = mockContactRequests.filter(r => r.status === "pending")
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
                     <div className="flex items-center justify-center p-6">
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
                  <div className="flex flex-col rounded-xl border border-zinc-800 bg-neutral-800/20 backdrop-blur-sm">
                     <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
                        <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                           <IconBriefcase className="h-4 w-4 text-zinc-400" />
                           Requests
                        </h3>
                        {pendingRequests.length > 0 && (
                           <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                              {pendingRequests.length} New
                           </span>
                        )}
                     </div>

                     <div className="flex-1 overflow-hidden">
                        {pendingRequests.length > 0 ? (
                           <div className="divide-y divide-zinc-800/50">
                              {pendingRequests.map(req => (
                                 <div
                                    key={req.id}
                                    className="p-4 hover:bg-zinc-900/20 transition-colors"
                                 >
                                    <div className="flex items-start gap-3">
                                       <Avatar className="h-8 w-8 border border-zinc-800">
                                          <AvatarImage
                                             src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${req.recruiterName}`}
                                          />
                                          <AvatarFallback>RC</AvatarFallback>
                                       </Avatar>
                                       <div className="flex-1 min-w-0">
                                          <div className="flex items-center justify-between mb-1">
                                             <p className="text-sm font-medium text-zinc-200 truncate">
                                                {req.recruiterName}
                                             </p>
                                             <span className="text-[10px] text-zinc-500">
                                                2h ago
                                             </span>
                                          </div>
                                          <p className="text-xs text-zinc-400 mb-3 truncate">
                                             Software Engineer @ TechCorp
                                          </p>

                                          <div className="flex gap-2">
                                             <Button
                                                size="sm"
                                                className="h-7 flex-1 bg-zinc-50 text-zinc-900 hover:bg-zinc-200 text-xs"
                                             >
                                                <IconCheck className="mr-1.5 h-3 w-3" />
                                                Accept
                                             </Button>
                                             <Button
                                                size="sm"
                                                variant="outline"
                                                className="h-7 flex-1 border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs hover:bg-zinc-800"
                                             >
                                                <IconX className="mr-1.5 h-3 w-3" />
                                                Ignore
                                             </Button>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <div className="flex flex-col items-center justify-center py-12 text-center">
                              <div className="h-12 w-12 rounded-full bg-zinc-900 flex items-center justify-center mb-3 border border-zinc-800">
                                 <IconCheck className="h-6 w-6 text-zinc-600" />
                              </div>
                              <p className="text-sm text-zinc-500">All caught up!</p>
                           </div>
                        )}
                     </div>

                     <div className="border-t border-zinc-800 p-2">
                        <Button
                           variant="ghost"
                           className="w-full text-xs text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50 h-8"
                        >
                           View Request History
                           <IconArrowUpRight className="ml-2 h-3 w-3" />
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
