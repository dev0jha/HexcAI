"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { apiClient } from "@/lib/eden"
import {
   conversationQueries,
   messageQueries,
   sendMessageMutation,
   type Message,
} from "@/lib/queries/queryOptions"
import { attemptSync } from "@/utils/attempt"

export function useMessageStream(
   conversationId: string | null,
   onNewMessage: (message: Message) => void
) {
   const eventSourceRef = useRef<EventSource | null>(null)
   const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
   const onNewMessageRef = useRef(onNewMessage)

   useEffect(() => {
      onNewMessageRef.current = onNewMessage
   }, [onNewMessage])

   const connect = useCallback(() => {
      if (!conversationId) return

      if (eventSourceRef.current) {
         eventSourceRef.current.close()
         eventSourceRef.current = null
      }

      const baseUrl =
         typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"
      const url = `${baseUrl}/api/conversations/${conversationId}/messages/stream`

      console.log("[SSE] Connecting to:", url)

      const eventSource = new EventSource(url)

      eventSource.onopen = () => {
         console.log("[SSE] Connected to stream for conversation:", conversationId)
      }

      eventSource.onmessage = event => {
         console.log("[SSE] Received message:", event.data)
         try {
            const data = JSON.parse(event.data)
            if (data.type === "new_message" && data.message) {
               console.log("[SSE] New message received:", data.message)
               onNewMessageRef.current(data.message)
            } else {
               console.log("[SSE] Other event:", data)
            }
         } catch (e) {
            console.error("[SSE] Error parsing message:", e)
         }
      }

      eventSource.onerror = err => {
         console.error("[SSE] Error:", err)
         eventSource.close()

         if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
         }

         reconnectTimeoutRef.current = setTimeout(() => {
            console.log("[SSE] Reconnecting...")
            connect()
         }, 3000)
      }

      eventSourceRef.current = eventSource
   }, [conversationId])

   useEffect(() => {
      if (conversationId) {
         connect()
      }

      return () => {
         console.log("[SSE] Cleaning up SSE connection")
         if (eventSourceRef.current) {
            eventSourceRef.current.close()
            eventSourceRef.current = null
         }
         if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
            reconnectTimeoutRef.current = null
         }
      }
   }, [conversationId, connect])

   return {
      isConnected: eventSourceRef.current?.readyState === EventSource.OPEN,
   }
}

export function useConversations() {
   const { data, isLoading, error, refetch } = useQuery(conversationQueries.list())

   return {
      conversations: data?.conversations ?? [],
      isLoading,
      error,
      refetch,
   }
}

export function useMessages(conversationId: string | null) {
   const queryClient = useQueryClient()
   const [streamMessages, setStreamMessages] = useState<Message[]>([])

   const { data, isLoading, error, refetch } = useQuery(
      conversationId
         ? messageQueries.list(conversationId)
         : {
              queryKey: [],
              queryFn: () => Promise.resolve({ success: true, messages: [] as Message[] }),
           }
   )

   const handleNewMessage = useCallback(
      (message: Message) => {
         console.log("[useMessages] New message from SSE:", message)
         setStreamMessages(prev => {
            const exists = prev.some(m => m.id === message.id)
            if (exists) return prev
            return [...prev, message]
         })
         // Also refetch to ensure we have latest
         refetch()
      },
      [refetch]
   )

   useMessageStream(conversationId, handleNewMessage)

   useEffect(() => {
      setStreamMessages([])
   }, [conversationId])

   // Also refetch when window gains focus (handles case when user switches tabs)
   useEffect(() => {
      const handleFocus = () => {
         refetch()
      }
      window.addEventListener("focus", handleFocus)
      return () => window.removeEventListener("focus", handleFocus)
   }, [refetch])

   // Polling fallback - refetch every 5 seconds as backup
   useEffect(() => {
      if (!conversationId) return

      const interval = setInterval(() => {
         refetch()
      }, 5000)

      return () => clearInterval(interval)
   }, [conversationId, refetch])

   const allMessages = [...(data?.messages ?? []), ...streamMessages]

   const sendMessageMutationFn = useMutation({
      ...sendMessageMutation,
      onSuccess: async () => {
         queryClient.invalidateQueries({ queryKey: ["messages"] })
         queryClient.invalidateQueries({ queryKey: ["conversations"] })
         await refetch()
         toast.success("Message sent")
      },
      onError: (error: Error) => {
         toast.error(error.message || "Failed to send message")
      },
   })

   const sendMessage = (content: string) => {
      if (!conversationId) return
      sendMessageMutationFn.mutate({ conversationId, content })
   }

   return {
      messages: allMessages,
      isLoading,
      error,
      refetch,
      sendMessage,
      isSending: sendMessageMutationFn.isPending,
   }
}

export function useMessagesPage(contactRequestId?: string | null) {
   const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null)
   const [pendingContactRequestId, setPendingContactRequestId] = useState<string | null>(null)
   const queryClient = useQueryClient()

   const {
      conversations,
      isLoading: isLoadingConversations,
      refetch: refetchConversations,
   } = useConversations()
   const {
      messages,
      isLoading: isLoadingMessages,
      refetch: refetchMessages,
      sendMessage,
      isSending,
   } = useMessages(selectedConversationId)

   const createConversationMutation = useMutation({
      mutationFn: async ({
         contactRequestId,
         content,
      }: {
         contactRequestId: string
         content: string
      }) => {
         const response = await apiClient.conversations.post({
            contactRequestId,
            initialMessage: content,
         })

         if (response.error || !response.data.success) {
            throw new Error(response.data?.message ?? "Failed to create conversation")
         }

         return response.data.conversation
      },
      onSuccess: async () => {
         queryClient.invalidateQueries({ queryKey: ["conversations"] })
         queryClient.invalidateQueries({ queryKey: ["messages"] })
         await refetchConversations()
         toast.success("Conversation started")
      },
      onError: (error: Error) => {
         toast.error(error.message || "Failed to start conversation")
      },
   })

   useEffect(() => {
      if (contactRequestId) {
         if (conversations.length > 0) {
            const matchedConversation = conversations.find(
               c => c.contactRequestId === contactRequestId
            )
            if (matchedConversation && !selectedConversationId) {
               setSelectedConversationId(matchedConversation.id)
               return
            }

            if (!matchedConversation && !selectedConversationId && !pendingContactRequestId) {
               setPendingContactRequestId(contactRequestId)
            }
         } else if (!selectedConversationId && !pendingContactRequestId) {
            setPendingContactRequestId(contactRequestId)
         }
      }
   }, [conversations, contactRequestId, selectedConversationId, pendingContactRequestId])

   const selectConversation = (id: string | null) => {
      setSelectedConversationId(id)
      setPendingContactRequestId(null)
   }

   const startConversation = (content: string) => {
      if (!pendingContactRequestId) return
      createConversationMutation.mutate(
         { contactRequestId: pendingContactRequestId, content },
         {
            onSuccess: conversation => {
               if (conversation?.id) {
                  setSelectedConversationId(conversation.id)
                  setPendingContactRequestId(null)
                  refetchConversations()
               }
            },
         }
      )
   }

   return {
      conversations,
      messages,
      selectedConversationId,
      pendingContactRequestId,
      selectConversation,
      isLoadingConversations,
      isLoadingMessages,
      refetchConversations,
      refetchMessages,
      sendMessage,
      isSending,
      startConversation,
      isStartingConversation: createConversationMutation.isPending,
   }
}
