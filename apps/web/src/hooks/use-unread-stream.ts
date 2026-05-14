"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { attemptSync } from "@/utils/attempt"

interface UnreadConversation {
   id: string
   contactRequestId: string
   candidateId: string
   recruiterId: string
   lastMessageAt: Date
   createdAt: Date
   candidateName: string | null
   candidateGithub: string | null
   recruiterName: string | null
   recruiterCompany: string | null
   unreadCount: number
}

interface UnreadData {
   type: "initial" | "unread_update"
   conversations: UnreadConversation[]
   totalUnread: number
}

export function useUnreadStream() {
   const queryClient = useQueryClient()

   const [conversations, setConversations] = useState<UnreadConversation[]>([])
   const [totalUnread, setTotalUnread] = useState(0)
   const [isConnected, setIsConnected] = useState(false)
   const eventSourceRef = useRef<EventSource | null>(null)
   const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
   const reconnectAttemptsRef = useRef(0)
   const maxReconnectAttempts = 5

   const connect = useCallback(() => {
      if (eventSourceRef.current) {
         eventSourceRef.current.close()
      }

      const baseUrl =
         typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"
      const url = `${baseUrl}/api/conversations/unread/stream`

      const eventSource = new EventSource(url)

      eventSource.onopen = () => {
         setIsConnected(true)
         reconnectAttemptsRef.current = 0
      }

      eventSource.onmessage = event => {
         const dataAttempt = attemptSync(() => JSON.parse(event.data) as UnreadData)
         if (!dataAttempt.ok) {
            console.error("[Unread SSE] Error parsing data:", dataAttempt.error)
            return
         }

         const data = dataAttempt.data

         if (data.type === "initial" || data.type === "unread_update") {
            setConversations(data.conversations)
            setTotalUnread(data.totalUnread)

            queryClient.setQueryData(["conversations", "withUnread"], {
               success: true,
               conversations: data.conversations,
               totalUnread: data.totalUnread,
            })
         }
      }

      eventSource.onerror = () => {
         setIsConnected(false)
         eventSource.close()

         if (reconnectAttemptsRef.current < maxReconnectAttempts) {
            if (reconnectTimeoutRef.current) {
               clearTimeout(reconnectTimeoutRef.current)
            }

            const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 10000)
            reconnectTimeoutRef.current = setTimeout(() => {
               reconnectAttemptsRef.current++
               connect()
            }, delay)
         }
      }

      eventSourceRef.current = eventSource
   }, [queryClient])

   useEffect(() => {
      connect()

      return () => {
         if (eventSourceRef.current) {
            eventSourceRef.current.close()
            eventSourceRef.current = null
         }
         if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current)
            reconnectTimeoutRef.current = null
         }
      }
   }, [connect])

   return {
      conversations,
      totalUnread,
      isConnected,
      refetch: () => {
         if (eventSourceRef.current) {
            eventSourceRef.current.close()
            connect()
         }
      },
   }
}
