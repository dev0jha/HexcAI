"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useMessagesPage } from "@/hooks/use-messages"
import {
   MessagingLayout,
   MessagingSidebar,
   MessagingChatWindow,
   MessagingEmptyState,
} from "@/components/chat"
import { useReactiveSession } from "@/lib/auth-client"

function RecruiterMessagesPageInner() {
   const searchParams = useSearchParams()
   const contactRequestId = searchParams.get("contactRequestId")

   const { session } = useReactiveSession()

   const user = session?.user

   const {
      conversations,
      messages,
      selectedConversationId,
      pendingContactRequestId,
      selectConversation,
      isLoadingMessages,
      sendMessage,
      isSending,
      startConversation,
      isStartingConversation,
   } = useMessagesPage(contactRequestId)

   const formattedConversations = conversations.map(c => ({
      id: c.id,
      lastMessageAt: c.lastMessageAt,
      title: c.candidateName ?? c.candidateGithub ?? "Unknown Candidate",
      subtitle: "Software Engineer",
      unreadCount: c.unreadCount,
   }))

   const selectedChat = conversations.find(c => c.id === selectedConversationId)
   const isMobileActive = !!(selectedConversationId || pendingContactRequestId)

   return (
      <MessagingLayout>
         <MessagingSidebar
            conversations={formattedConversations}
            selectedId={selectedConversationId}
            isMobileView={isMobileActive}
            onSelect={selectConversation}
         />

         {selectedConversationId && selectedChat ? (
            <MessagingChatWindow
               title={selectedChat.candidateName || selectedChat.candidateGithub || "Candidate"}
               subtitle="Developer Profile"
               messages={messages}
               currentUserId={user?.id || ""}
               isLoading={isLoadingMessages}
               isSending={isSending}
               onSend={sendMessage}
               onBack={() => selectConversation(null)}
            />
         ) : pendingContactRequestId ? (
            <MessagingChatWindow
               title="Contact Candidate"
               subtitle="Send your initial outreach"
               messages={[]}
               currentUserId={user?.id || ""}
               isLoading={false}
               isSending={isStartingConversation}
               isNewChat={true}
               onSend={startConversation}
               onBack={() => selectConversation(null)}
            />
         ) : (
            <MessagingEmptyState />
         )}
      </MessagingLayout>
   )
}

export default function RecruiterMessagesPage() {
   return (
      <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading messages...</div>}>
         <RecruiterMessagesPageInner />
      </Suspense>
   )
}
