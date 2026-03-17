"use client"

import { useSearchParams } from "next/navigation"
import { useMessagesPage } from "@/hooks/use-messages"
import {
   MessagingLayout,
   MessagingSidebar,
   MessagingChatWindow,
   MessagingEmptyState,
} from "@/components/chat"
import { useReactiveSession } from "@/lib/auth-client"

export default function CandidateMessagesPage() {
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
      isLoadingConversations,
      isLoadingMessages,
      sendMessage,
      isSending,
      startConversation,
      isStartingConversation,
   } = useMessagesPage(contactRequestId)

   const formattedConversations = conversations.map(c => ({
      id: c.id,
      lastMessageAt: c.lastMessageAt,
      title: c.recruiterName || c.recruiterCompany || "Unknown Recruiter",
      subtitle: c.recruiterCompany || "Connection",
   }))

   const selectedChat = conversations.find(c => c.id === selectedConversationId)
   const isMobileActive = !!(selectedConversationId || pendingContactRequestId)

   if (isLoadingConversations) return <div>Loading...</div>

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
               title={selectedChat.recruiterName || selectedChat.recruiterCompany || "Recruiter"}
               subtitle={selectedChat.recruiterCompany || "Enterprise"}
               messages={messages}
               currentUserId={user?.id || ""}
               isLoading={isLoadingMessages}
               isSending={isSending}
               onSend={sendMessage}
               onBack={() => selectConversation(null)}
            />
         ) : pendingContactRequestId ? (
            <MessagingChatWindow
               title="New Connection"
               subtitle="Start the conversation"
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
