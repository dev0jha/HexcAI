"use client"

import { useState, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { IconMessage, IconSend } from "@tabler/icons-react"
import { useMessagesPage } from "@/hooks/use-messages"

export default function RecruiterMessagesPage() {
   const searchParams = useSearchParams()
   const contactRequestId = searchParams.get("contactRequestId")

   const {
      conversations,
      messages,
      selectedConversationId,
      pendingContactRequestId,
      selectConversation,
      isLoadingConversations,
      isLoadingMessages,
      sendMessage,
      isSending,
      startConversation,
      isStartingConversation,
   } = useMessagesPage(contactRequestId)

   const [messageInput, setMessageInput] = useState("")
   const messagesEndRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
   }, [messages])

   const handleSend = () => {
      if (!messageInput.trim() || isSending) return
      sendMessage(messageInput)
      setMessageInput("")
   }

   const handleStartConversation = () => {
      if (!messageInput.trim() || isStartingConversation) return
      startConversation(messageInput)
   }

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault()
         if (selectedConversationId) {
            handleSend()
         } else if (pendingContactRequestId) {
            handleStartConversation()
         }
      }
   }

   const selectedConversation = conversations.find(c => c.id === selectedConversationId)

   if (isLoadingConversations) {
      return <LoadingState />
   }

   return (
      <div className="flex h-[calc(100vh-4rem)]">
         <div className="w-80 border-r border-zinc-800 flex flex-col">
            <div className="p-4 border-b border-zinc-800">
               <h2 className="text-lg font-semibold text-zinc-100">Messages</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
               {conversations.length === 0 ? (
                  <div className="p-4 text-center text-zinc-500">
                     <IconMessage className="h-8 w-8 mx-auto mb-2 opacity-50" />
                     <p className="text-sm">No conversations yet</p>
                     <p className="text-xs mt-1 opacity-70">
                        Contact a candidate to start chatting
                     </p>
                  </div>
               ) : (
                  <div className="divide-y divide-zinc-800">
                     {conversations.map(conversation => (
                        <button
                           key={conversation.id}
                           onClick={() => selectConversation(conversation.id)}
                           className={`w-full p-4 text-left hover:bg-zinc-800/50 transition-colors ${
                              selectedConversationId === conversation.id ? "bg-zinc-800/50" : ""
                           }`}
                        >
                           <div className="font-medium text-zinc-100">
                              {conversation.candidateName ||
                                 conversation.candidateGithub ||
                                 "Unknown"}
                           </div>
                           <div className="text-sm text-zinc-500 truncate">
                              {conversation.recruiterCompany || "Unknown"}
                           </div>
                           <div className="text-xs text-zinc-600 mt-1">
                              {new Date(conversation.lastMessageAt).toLocaleDateString()}
                           </div>
                        </button>
                     ))}
                  </div>
               )}
            </div>
         </div>

         <div className="flex-1 flex flex-col">
            {selectedConversationId ? (
               <>
                  <div className="p-4 border-b border-zinc-800">
                     <h3 className="font-semibold text-zinc-100">
                        {selectedConversation?.candidateName ||
                           selectedConversation?.candidateGithub ||
                           "Chat"}
                     </h3>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                     {isLoadingMessages ? (
                        <div className="flex items-center justify-center h-full">
                           <div className="text-zinc-500">Loading messages...</div>
                        </div>
                     ) : messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-zinc-500">
                           <p>No messages yet. Start the conversation!</p>
                        </div>
                     ) : (
                        messages.map(message => (
                           <MessageBubble key={message.id} message={message} />
                        ))
                     )}
                     <div ref={messagesEndRef} />
                  </div>

                  <div className="p-4 border-t border-zinc-800">
                     <div className="flex gap-2">
                        <input
                           type="text"
                           value={messageInput}
                           onChange={e => setMessageInput(e.target.value)}
                           onKeyDown={handleKeyDown}
                           placeholder="Type a message..."
                           className="flex-1 bg-zinc-800 border-none rounded-md px-4 py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           disabled={isSending}
                        />
                        <button
                           onClick={handleSend}
                           disabled={!messageInput.trim() || isSending}
                           className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-md transition-colors"
                        >
                           <IconSend className="h-5 w-5" />
                        </button>
                     </div>
                  </div>
               </>
            ) : pendingContactRequestId ? (
               <div className="flex-1 flex flex-col">
                  <div className="p-4 border-b border-zinc-800">
                     <h3 className="font-semibold text-zinc-100">Start a Conversation</h3>
                     <p className="text-sm text-zinc-500">
                        Send the first message to start chatting
                     </p>
                  </div>
                  <div className="flex-1" />
                  <div className="p-4 border-t border-zinc-800">
                     <div className="flex gap-2">
                        <textarea
                           value={messageInput}
                           onChange={e => setMessageInput(e.target.value)}
                           onKeyDown={handleKeyDown}
                           placeholder="Type your first message..."
                           className="flex-1 bg-zinc-800 border-none rounded-md px-4 py-2 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
                           disabled={isStartingConversation}
                        />
                     </div>
                     <div className="mt-2 flex justify-end">
                        <button
                           onClick={handleStartConversation}
                           disabled={!messageInput.trim() || isStartingConversation}
                           className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
                        >
                           <IconSend className="h-4 w-4" />
                           {isStartingConversation ? "Sending..." : "Send Message"}
                        </button>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="flex-1 flex items-center justify-center text-zinc-500">
                  <div className="text-center">
                     <IconMessage className="h-12 w-12 mx-auto mb-4 opacity-50" />
                     <p>Select a conversation to start messaging</p>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

function MessageBubble({
   message,
}: {
   message: { content: string; senderId: string; createdAt: Date; senderName: string | null }
}) {
   return (
      <div className="flex flex-col">
         <div className="text-xs text-zinc-500 mb-1">{message.senderName || "Unknown"}</div>
         <div className="bg-zinc-800 rounded-lg px-4 py-2 max-w-md">
            <p className="text-zinc-100 whitespace-pre-wrap">{message.content}</p>
         </div>
         <div className="text-xs text-zinc-600 mt-1">
            {new Date(message.createdAt).toLocaleString()}
         </div>
      </div>
   )
}

function LoadingState() {
   return (
      <div className="flex h-[calc(100vh-4rem)]">
         <div className="w-80 border-r border-zinc-800 p-4">
            <div className="h-8 w-24 bg-zinc-800 animate-pulse rounded mb-4" />
            <div className="space-y-2">
               {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-zinc-800/50 animate-pulse rounded" />
               ))}
            </div>
         </div>
         <div className="flex-1 flex items-center justify-center">
            <div className="text-zinc-500">Loading...</div>
         </div>
      </div>
   )
}
