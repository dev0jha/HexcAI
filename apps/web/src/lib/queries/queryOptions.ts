"use client"

import { keepPreviousData, queryOptions } from "@tanstack/react-query"
import { apiClient } from "@/lib/eden"
import { queryKeys } from "./queryKeys"
import type {
   ContactRequestQuery,
   ContactRequestResponse,
   CandidatesQuery,
   CandidatesResponse,
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
/* Candidate Queries */
/* ---------------------------------- */

export const candidateQueries = {
   list: (query: CandidatesQuery = {}) =>
      queryOptions<CandidatesResponse>({
         queryKey: queryKeys.candidates.list(query),
         queryFn: async () => {
            const response = await apiClient.developers.get({
               query: {
                  search: query.search,
                  tech: query.status && query.status !== "all" ? query.status : undefined,
                  sort: query.sort,
                  page: query.page,
                  limit: query.limit,
               },
            })

            if (response.error) {
               throw new Error("Failed to fetch candidates")
            }

            const respRes = response.data
            if (!respRes.success) {
               throw new Error(respRes.error ?? "Failed to fetch candidates")
            }

            const candidates = respRes.data.developers.map((dev: any) => ({
               ...dev,
               contactedDate: dev.contactedDate || null,
               status: dev.status || "pending",
            }))

            return {
               candidates,
               meta: respRes.data.meta,
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

   byUsername: (username: string) =>
      queryOptions<{ developer: any }>({
         queryKey: queryKeys.developers.detail(username),
         queryFn: async () => {
            const response = await apiClient.developers[username].get()

            if (response.error) {
               throw new Error("Failed to fetch developer")
            }

            const respRes = response.data
            if (!respRes.success) {
               throw new Error(respRes.error ?? "Failed to fetch developer")
            }

            return respRes.data
         },
         staleTime: 1000 * 60 * 5,
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

export const updateUserMutation = {
   mutationFn: async (payload: {
      name?: string
      company?: string
      position?: string
      bio?: string
      location?: string
      isOpenToRecruiters?: boolean
   }) => {
      const { data, error } = await apiClient.user.patch(payload)

      if (error || (data && !data.success)) {
         throw new Error((data as any)?.message ?? "Failed to update user")
      }

      return data
   },
}
