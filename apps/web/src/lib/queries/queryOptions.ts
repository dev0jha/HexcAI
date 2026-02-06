"use client"

import { keepPreviousData, queryOptions } from "@tanstack/react-query"
import { apiClient } from "@/lib/eden"
import { queryKeys } from "./queryKeys"
import type {
   ContactRequestQuery,
   ContactRequestResponse,
   DevelopersQuery,
   DevelopersResponse,
   TechStackResponse,
} from "@/lib/queries/query.types"

export const contactRequestQueries = {
   list: (query: ContactRequestQuery = {}) =>
      queryOptions<ContactRequestResponse>({
         queryKey: queryKeys.contactRequests.list(query),
         queryFn: async () => {
            const response = await apiClient["contact-requests"].get({ query })

            if (response.error) {
               throw new Error("Failed to fetch contact requests")
            }

            if (!response.data.success) {
               throw new Error(response.data.message ?? "Failed to fetch contact requests")
            }

            const respRes = response.data
            if (!respRes.success) {
               throw new Error(respRes.message ?? "Failed to fetch contact requests")
            }

            return {
               data: respRes.contactRequests,
               meta: respRes.meta,
            }
         },
         staleTime: 1000 * 60 * 2,
      }),
}

/* ---------------------------------- */
/* Developer Queries */
/* ---------------------------------- */

export const developerQueries = {
   list: (query: DevelopersQuery = {}) =>
      queryOptions<DevelopersResponse>({
         queryKey: queryKeys.developers.list(query),
         queryFn: async () => {
            const response = await apiClient.developers.get({ query })

            if (response.error) {
               throw new Error("Failed to fetch developers")
            }

            const respRes = response.data
            if (!respRes.success) {
               throw new Error(respRes.error ?? "Failed to fetch developers")
            }

            return respRes.data
         },
         staleTime: 1000 * 60 * 2,
      }),

   techStacks: () =>
      queryOptions<TechStackResponse>({
         queryKey: queryKeys.developers.techStacks(),
         queryFn: async () => {
            const response = await apiClient.developers["tech-stacks"].get()

            if (response.error) {
               throw new Error("Failed to fetch tech stacks")
            }

            const respRes = response.data

            if (!respRes.success) {
               throw new Error(respRes.error ?? "Failed to fetch tech stacks")
            }

            return respRes.data
         },
         staleTime: 1000 * 60 * 10,
      }),
}

/* ---------------------------------- */
/* Mutations */
/* ---------------------------------- */

export const updateContactRequestMutation = {
   mutationFn: async ({
      requestId,
      status,
   }: {
      requestId: string
      status: "accepted" | "rejected"
   }) => {
      const response = await apiClient["contact-requests"]({
         requestId,
      }).patch({ status })

      if (response.error || !response.data.success) {
         throw new Error(response.data?.message ?? "Failed to update contact request")
      }

      return response.data.updatedRequest
   },
}

export const createContactRequestMutation = {
   mutationFn: async ({ candidateId, message }: { candidateId: string; message: string }) => {
      const response = await apiClient["contact-requests"].post({
         candidateId,
         message,
      })

      if (response.error || !response.data?.success) {
         throw new Error(response.data?.error ?? "Failed to send contact request")
      }

      return response.data.createdRequest
   },
}

export const createUserQueryOptions = () =>
   queryOptions({
      queryKey: queryKeys.user(),
      queryFn: async () => {
         const { data, error } = await apiClient.user.get()
         if (error) {
            throw error
         }

         return data
      },
      staleTime: 1000 * 60 * 5,
      placeholderData: keepPreviousData,
   })
