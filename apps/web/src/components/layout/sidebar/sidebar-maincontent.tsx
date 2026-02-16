"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
   IconChevronRight,
   IconHistory,
   IconInbox,
   IconLayout,
   IconSearch,
   IconSettings,
   IconGitBranch,
} from "@tabler/icons-react"

import { SidebarContent } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const navGroups = [
   {
      label: "Platform",
      items: [
         {
            title: "Overview",
            url: "/dashboard",
            icon: IconLayout,
         },
      ],
   },
   {
      label: "Development",
      items: [
         {
            title: "Analysis",
            icon: IconGitBranch,
            url: "#",
            items: [
               { title: "New Analysis", url: "/dashboard/analysis", icon: IconSearch },
               { title: "History", url: "/dashboard/history", icon: IconHistory },
            ],
         },
      ],
   },
   {
      label: "Workspace",
      items: [
         {
            title: "Management",
            icon: IconSettings,
            url: "#",
            items: [
               { title: "Requests", url: "/dashboard/requests", icon: IconInbox },
               { title: "Settings", url: "/dashboard/settings", icon: IconSettings },
            ],
         },
      ],
   },
]

export function CandidateSidebarMainContent() {
   const pathname = usePathname()

   // Default the 'Analysis' folder to be open so user sees main actions immediately
   const [openItems, setOpenItems] = React.useState<string[]>(["Analysis", "Management"])

   const toggleItem = (title: string) => {
      setOpenItems(prev =>
         prev.includes(title) ? prev.filter(item => item !== title) : [...prev, title]
      )
   }

   return (
      <SidebarContent className="text-zinc-400 bg-[#191919]">
         <nav className="flex flex-col gap-6 px-3 py-6">
            {navGroups.map((group, idx) => (
               <div key={idx} className="flex flex-col gap-2">
                  {/* Section Label */}
                  {group.label && (
                     <h4 className="px-2 text-xs font-medium text-zinc-500/80 uppercase tracking-wider">
                        {group.label}
                     </h4>
                  )}

                  <div className="flex flex-col gap-0.5">
                     {group.items.map(item => {
                        const isOpen = openItems.includes(item.title)
                        const hasSubItems = item.items && item.items.length > 0

                        // Check if main item or any child is active
                        const isMainActive = pathname === item.url
                        const isChildActive = item.items?.some(sub => pathname === sub.url)

                        return (
                           <div key={item.title}>
                              {/* Parent / Main Item */}
                              {hasSubItems ? (
                                 <button
                                    onClick={() => toggleItem(item.title)}
                                    className={cn(
                                       "group flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-zinc-800/50 hover:text-zinc-100",
                                       isMainActive || isChildActive
                                          ? "text-zinc-100"
                                          : "text-zinc-400"
                                    )}
                                 >
                                    <div className="flex items-center gap-2.5">
                                       <item.icon className="h-4 w-4 shrink-0" />
                                       <span className="font-medium">{item.title}</span>
                                    </div>
                                    <IconChevronRight
                                       className={cn(
                                          "h-3.5 w-3.5 text-zinc-600 transition-transform duration-200",
                                          isOpen && "rotate-90"
                                       )}
                                    />
                                 </button>
                              ) : (
                                 <Link
                                    href={item.url}
                                    className={cn(
                                       "group flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-zinc-800/50 hover:text-zinc-100",
                                       isMainActive ? "bg-zinc-800 text-zinc-100" : "text-zinc-400"
                                    )}
                                 >
                                    <item.icon className="h-4 w-4 shrink-0" />
                                    <span className="font-medium">{item.title}</span>
                                 </Link>
                              )}

                              {/* Nested Sub Items (The visual style you requested) */}
                              {hasSubItems && isOpen && (
                                 <div className="relative mt-1 ml-2.5 pl-3">
                                    {/* Vertical Line Guide */}
                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800" />

                                    <div className="flex flex-col gap-1">
                                       {item.items?.map(subItem => {
                                          const isSubActive = pathname === subItem.url
                                          return (
                                             <Link
                                                key={subItem.title}
                                                href={subItem.url}
                                                className={cn(
                                                   "block rounded-md px-2 py-1 text-sm transition-colors hover:text-zinc-100",
                                                   isSubActive
                                                      ? "text-zinc-100 font-medium"
                                                      : "text-zinc-500"
                                                )}
                                             >
                                                {subItem.title}
                                             </Link>
                                          )
                                       })}
                                    </div>
                                 </div>
                              )}
                           </div>
                        )
                     })}
                  </div>
               </div>
            ))}
         </nav>
      </SidebarContent>
   )
}
