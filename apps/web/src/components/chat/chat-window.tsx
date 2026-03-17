"use client"

import { useEffect, useRef, useState } from "react"
import { IconChevronLeft, IconMessage, IconSend, IconUser } from "@tabler/icons-react"
import { MessageBubble } from "@/components/chat/message-bubble"

import type { Message } from "./chat-layout"
import { PatternBackground } from "@/components/pattern-background"

interface ChatWindowProps {
   title: string
   subtitle: string
   messages: Message[]
   currentUserId: string
   isLoading: boolean
   isSending: boolean
   onSend: (text: string) => void
   onBack: () => void
   isNewChat?: boolean
}

export function MessagingChatWindow({
   title,
   subtitle,
   messages,
   currentUserId,
   isLoading,
   isSending,
   onSend,
   onBack,
   isNewChat,
}: ChatWindowProps) {
   const [input, setInput] = useState("")
   const bottomRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
   }, [messages])

   const handleSend = () => {
      if (!input.trim() || isSending) return
      onSend(input)
      setInput("")
   }

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault()
         handleSend()
      }
   }

   return (
      <div className="flex-1 flex flex-col relative">
         {/* Chat Header */}
         <div className="h-16 px-4 sm:px-6 border-b border-neutral-800/60 flex items-center justify-between backdrop-blur-md z-10 shrink-0">
            <div className="flex items-center gap-3 w-full">
               <button
                  onClick={onBack}
                  className="md:hidden p-2 -ml-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-md transition-colors"
               >
                  <IconChevronLeft className="w-5 h-5" />
               </button>
               <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center text-neutral-500 shrink-0 shadow-sm">
                     <IconUser className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                     <h3 className="text-[15px] font-medium text-neutral-200 leading-tight">
                        {title}
                     </h3>
                     <p className="text-[12px] text-neutral-500 mt-0.5">{subtitle}</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Messages Area */}
         <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-6">
            <PatternBackground />
            {isLoading ? (
               <div className="flex items-center justify-center h-full text-sm text-neutral-500 animate-pulse">
                  Loading chat...
               </div>
            ) : isNewChat || messages.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full text-neutral-500 space-y-3">
                  <div className="w-12 h-12 bg-neutral-900/50 rounded-full flex items-center justify-center border border-neutral-800">
                     <IconMessage className="w-5 h-5 opacity-50" />
                  </div>
                  <p className="text-sm">This is the beginning of your conversation.</p>
               </div>
            ) : (
               <div className="flex flex-col gap-5">
                  {messages.map(msg => (
                     <MessageBubble
                        key={msg.id}
                        message={msg}
                        isMine={msg.senderId === currentUserId}
                     />
                  ))}
               </div>
            )}
            <div ref={bottomRef} className="h-1" />
         </div>

         {/* Input Area */}
         <div className="p-4 sm:p-6 shrink-0">
            <div className="flex items-end gap-2 max-w-4xl mx-auto relative group">
               <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  disabled={isSending}
                  className="w-full border border-neutral-800 hover:border-neutral-700 focus:border-neutral-800 bg-neutral-900 rounded-2xl pl-5 pr-14 py-3.5 sm:py-4 text-[14px] text-neutral-200 placeholder:text-neutral-600 focus:outline-none transition-all duration-200 resize-none max-h-32 min-h-13"
                  rows={1}
                  style={{ scrollbarWidth: "none" }}
               />
               <button
                  onClick={handleSend}
                  disabled={!input.trim() || isSending}
                  className="absolute right-2 bottom-2 p-2 bg-neutral-200 text-black hover:bg-white disabled:bg-neutral-800/50 disabled:text-neutral-600 rounded-xl transition-all duration-200 active:scale-95 disabled:active:scale-100 flex items-center justify-center shrink-0 h-10 w-10 shadow-sm"
               >
                  <IconSend className="h-4 w-4 ml-0.5" />
               </button>
            </div>
         </div>
      </div>
   )
}
