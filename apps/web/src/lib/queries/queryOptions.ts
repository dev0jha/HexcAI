"use client"

import { apiClient } from "@/lib/eden"
import { queryKeys } from "./queryKeys"

export interface ContactRequestQuery {
   page?: number
   limit?: number
   status?: "pending" | "accepted" | "rejected"
}

export interface ContactRequest {
   id: string
   recruiterId: string
   candidateId: string
   message: string | null
   status: "pending" | "accepted" | "rejected"
   createdAt: Date
   recruiterName: string | null
   recruiterCompany: string | null
   recruiterEmail: string | null
}

export interface ContactRequestResponse {
   data: ContactRequest[]
   meta: {
      page: number
      limit: number
      total: number
      totalPages: number
      hasNext: boolean
      hasPrev: boolean
   }
}

export const contactRequestQueryOptions = {
   all: (query: ContactRequestQuery = {}) => ({
      queryKey: queryKeys.contactRequests.list(query),
      queryFn: async () => {
         const response = await apiClient["contact-requests"].get({ query })

         if (response.error) {
            throw new Error("Failed to fetch contact requests")
         }

         if (!response.data?.success) {
            throw new Error(response.data?.message || "Failed to fetch contact requests")
         }

         return {
            data: response.data.data as ContactRequest[],
            meta: response.data.meta as ContactRequestResponse["meta"],
         }
      },
      staleTime: 1000 * 60 * 2, // 2 minutes
   }),
}

export const updateContactRequestMutationOptions = {
   mutationFn: async ({
      requestId,
      status,
   }: {
      requestId: string
      status: "accepted" | "rejected"
   }) => {
      const response = await apiClient["contact-requests"]({ requestId }).patch({ status })

      if (response.error) {
         throw new Error("Failed to update contact request")
      }

      if (!response.data?.success) {
         throw new Error(response.data?.message || "Failed to update contact request")
      }

      return response.data.data as ContactRequest
   },
}
