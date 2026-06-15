"use client"
import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getScoreLabel } from "@/types"
import {
   IconBrandGithub,
   IconBrandLinkedin,
   IconGlobe,
   IconMapPin,
   IconUser,
} from "@tabler/icons-react"

import type { Developer } from "@/types"

export function ProfileHeader({ developer }: { developer: Developer }) {
   const scoreLabel = getScoreLabel(developer.score)
   const [imgError, setImgError] = useState(false)

   return (
      <div className="relative overflow-hidden rounded-lg border-2 border-zinc-800/50 bg-neutral-900/40 p-6 shadow-none">
         <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            {/* Avatar Column */}
            <div className="flex shrink-0 flex-col items-center md:items-start">
               <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-xl shadow-black/40">
                  {imgError || !developer.avatar ? (
                     <IconUser className="h-10 w-10 text-zinc-600" />
                  ) : (
                     <Image
                        src={developer.avatar}
                        alt={developer.name}
                        fill
                        unoptimized
                        className="object-cover"
                        onError={() => setImgError(true)}
                     />
                  )}
               </div>

               {/* "Open to Work" - Redesigned to be subtle & clean */}
               {developer.isOpenToRecruiters && developer.score >= 80 && (
                  <div className="mt-3 flex items-center gap-2 rounded-full border border-zinc-800 bg-neutral-950/50 px-3 py-1.5">
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                     </span>
                     <span className="text-[10px] font-medium tracking-wide text-zinc-400">
                        Open to Work
                     </span>
                  </div>
               )}
            </div>

            {/* Info Column */}
            <div className="flex-1 text-center md:text-left">
               <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between">
                  <div>
                     <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
                        {developer.name}
                     </h1>
                     <p className="text-sm font-medium text-zinc-500">@{developer.username}</p>
                  </div>

                  {/* Desktop Score Display - Cleaned up */}
                  <div className="hidden md:flex flex-col items-end">
                     <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-zinc-100">{developer.score}</span>
                        <span className="text-sm text-zinc-600">/100</span>
                     </div>
                     <Badge
                        variant="outline"
                        size="sm"
                        className={cn(
                           "border-zinc-800 bg-neutral-900 px-2 py-1 items-center justify-center",
                           getScoreTextColor(developer.score)
                        )}
                     >
                        {scoreLabel}
                     </Badge>
                  </div>
               </div>

               {developer.bio && (
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400 max-w-2xl mx-auto md:mx-0">
                     {developer.bio}
                  </p>
               )}

               {/* Meta Data Row */}
               <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-zinc-800/50 pt-4 md:justify-start">
                  {developer.location && (
                     <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <IconMapPin className="h-3.5 w-3.5 text-zinc-600" />
                        {developer.location}
                     </div>
                  )}

                  <div className="h-3 w-px bg-neutral-800 hidden md:block" />

                  <div className="flex items-center gap-3">
                     {developer.website && (
                        <SocialLink
                           href={`https://${developer.website}`}
                           icon={IconGlobe}
                           label="Website"
                        />
                     )}
                     {developer.linkedIn && (
                        <SocialLink
                           href={`https://${developer.linkedIn}`}
                           icon={IconBrandLinkedin}
                           label="LinkedIn"
                        />
                     )}
                     <SocialLink href="#" icon={IconBrandGithub} label="GitHub" />
                  </div>
               </div>
            </div>
         </div>

         {/* Mobile Score Display */}
         <div className="mt-6 flex md:hidden items-center justify-between rounded-lg bg-neutral-950/50 p-4 border border-zinc-800/50">
            <span className="text-sm text-zinc-400">Developer Score</span>
            <div className="flex items-center gap-3">
               <Badge
                  variant="outline"
                  size="sm"
                  className={cn(
                     "border-zinc-800 bg-zinc-900 px-2 py-1",
                     getScoreTextColor(developer.score)
                  )}
               >
                  {scoreLabel}
               </Badge>
               <span className="text-xl font-bold text-zinc-100">{developer.score}</span>
            </div>
         </div>

         {/* Tech Stack */}
         <div className="mt-6 flex flex-wrap gap-2 pt-2">
            {developer.techStack.map(tech => (
               <Badge
                  key={tech}
                  variant="secondary"
                  size="sm"
                  className="bg-neutral-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 border-zinc-800/50 px-2 py-1 items-center justify-center"
               >
                  {tech}
               </Badge>
            ))}
         </div>
      </div>
   )
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
   return (
      <a
         href={href}
         target="_blank"
         rel="noopener noreferrer"
         className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-200"
      >
         <Icon className="h-3.5 w-3.5" />
         <span className="hidden sm:inline">{label}</span>
      </a>
   )
}

// Updated Helper: Returns text color only, keeping the background/border neutral
function getScoreTextColor(score: number) {
   if (score >= 90) return "text-emerald-400"
   if (score >= 70) return "text-blue-400"
   return "text-zinc-400"
}
