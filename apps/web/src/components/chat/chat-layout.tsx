"use client"

import React from "react"

export type Message = {
   id: string
   content: string
   senderId: string
   createdAt: Date
   senderName: string | null
}

export type Conversation = {
   id: string
   lastMessageAt: Date
   title: string
   subtitle: string
}

export function MessagingLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="flex text-neutral-200 overflow-hidden font-sans mt-2 h-[calc(92vh-1rem)]  rounded-xl">
         {children}
      </div>
   )
}
