"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { IconLayoutSidebar, IconMessage } from "@tabler/icons-react"

import type { Conversation } from "./chat-layout"
import { PatternBackground } from "@/components/pattern-background"

interface SidebarProps {
   conversations: Conversation[]
   selectedId: string | null
   isMobileView: boolean
   onSelect: (id: string) => void
}

export function MessagingSidebar({
   conversations,
   selectedId,
   isMobileView,
   onSelect,
}: SidebarProps) {
   const [width, setWidth] = useState(320)
   const [isCollapsed, setIsCollapsed] = useState(false)
   const [isDragging, setIsDragging] = useState(false)

   const startResizing = (e: React.MouseEvent) => {
      setIsDragging(true)
      const startX = e.clientX
      const startWidth = width

      const doDrag = (dragEvent: MouseEvent) => {
         const newWidth = startWidth + dragEvent.clientX - startX
         setWidth(Math.min(Math.max(newWidth, 240), 480))
      }

      const stopDrag = () => {
         setIsDragging(false)
         document.removeEventListener("mousemove", doDrag)
         document.removeEventListener("mouseup", stopDrag)
      }

      document.addEventListener("mousemove", doDrag)
      document.addEventListener("mouseup", stopDrag)
   }

   if (isCollapsed) {
      return (
         <div
            className={cn(
               "border-r border-neutral-800/60 flex flex-col items-center py-4 shrink-0 transition-all",
               isMobileView ? "hidden md:flex w-16" : "flex w-16"
            )}
         >
            <button
               onClick={() => setIsCollapsed(false)}
               className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors mb-4"
               title="Expand sidebar"
            >
               <IconLayoutSidebar className="w-5 h-5" />
            </button>
            <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar w-full flex flex-col items-center">
               {conversations.map(c => (
                  <button
                     key={c.id}
                     onClick={() => onSelect(c.id)}
                     className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center border transition-all",
                        selectedId === c.id
                           ? "bg-neutral-800 border-neutral-600 text-white"
                           : "bg-neutral-900/50 border-neutral-800/50 text-neutral-500 hover:bg-neutral-800 hover:text-neutral-300"
                     )}
                     title={c.title}
                  >
                     {c.title.charAt(0).toUpperCase()}
                  </button>
               ))}
            </div>
         </div>
      )
   }

   return (
      <div
         style={{ width: `${width}px` }}
         className={cn(
            "relative border-r border-neutral-800/60  flex-col transition-none shrink-0",
            isMobileView ? "hidden md:flex" : "flex w-full md:w-auto",
            isDragging && "select-none" // Prevent text selection while dragging
         )}
      >
         {/* Sidebar Header */}
         <div className="h-16 px-5 border-b border-neutral-800/60 flex items-center justify-between shrink-0">
            <h2 className="text-[15px] font-medium text-neutral-200">Messages</h2>
            <button
               onClick={() => setIsCollapsed(true)}
               className="p-1.5 text-neutral-500 hover:text-white hover:bg-neutral-900 rounded-md transition-colors hidden md:block"
            >
               <IconLayoutSidebar className="w-4 h-4" />
            </button>
         </div>

         {/* Conversation List */}
         <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
            {conversations.length === 0 ? (
               <div className="text-center p-6 text-neutral-500 mt-4">
                  <IconMessage className="h-6 w-6 mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-medium text-neutral-300">No active chats</p>
               </div>
            ) : (
               conversations.map(conversation => {
                  const isSelected = selectedId === conversation.id
                  return (
                     <button
                        key={conversation.id}
                        onClick={() => onSelect(conversation.id)}
                        className={cn(
                           "w-full p-3.5 text-left rounded-xl transition-all duration-200 relative overflow-hidden group border",
                           isSelected
                              ? "bg-neutral-900 border-neutral-700/50 shadow-sm"
                              : "bg-transparent border-transparent hover:bg-neutral-900/40 hover:border-neutral-800/50"
                        )}
                     >
                        {isSelected && <PatternBackground />}
                        <div className="relative z-10 flex justify-between items-baseline mb-1">
                           <div className="font-medium text-[14px] text-neutral-200 truncate pr-3">
                              {conversation.title}
                           </div>
                           <div className="text-[10px] text-neutral-500 shrink-0">
                              {new Date(conversation.lastMessageAt).toLocaleDateString(undefined, {
                                 month: "short",
                                 day: "numeric",
                              })}
                           </div>
                        </div>
                        <div className="relative z-10 text-[13px] text-neutral-500 truncate">
                           {conversation.subtitle}
                        </div>
                     </button>
                  )
               })
            )}
         </div>

         {/* Drag Handle (Desktop Only) */}
         <div
            onMouseDown={startResizing}
            className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-neutral-700/50 active:bg-neutral-600/50 transition-colors z-20 hidden md:block"
         />
      </div>
   )
}
