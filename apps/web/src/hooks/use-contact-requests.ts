"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
   contactRequestQueryOptions,
   updateContactRequestMutationOptions,
} from "@/lib/queries/queryOptions"
import { ContactRequest, ContactRequestQuery } from "@/lib/queries/queryOptions"

export function useContactRequests(query: ContactRequestQuery = {}) {
   const queryClient = useQueryClient()

   const {
      data: response,
      isLoading,
      error,
      refetch,
   } = useQuery(contactRequestQueryOptions.all(query))

   const updateStatusMutation = useMutation({
      ...updateContactRequestMutationOptions,
      onSuccess: updatedRequest => {
         // Invalidate and refetch all contact request queries
         queryClient.invalidateQueries({ queryKey: ["contact-requests"] })

         toast.success(
            updatedRequest.status === "accepted"
               ? "Contact request accepted"
               : "Contact request declined"
         )
      },
      onError: (error: Error) => {
         toast.error(error.message || "Failed to update contact request")
      },
   })

   const updateStatus = (requestId: string, status: "accepted" | "rejected") => {
      updateStatusMutation.mutate({ requestId, status })
   }

   // Helper functions to get filtered data
   const pendingRequests = response?.data.filter(r => r.status === "pending") || []
   const acceptedRequests = response?.data.filter(r => r.status === "accepted") || []
   const rejectedRequests = response?.data.filter(r => r.status === "rejected") || []

   return {
      data: response?.data || [],
      meta: response?.meta,
      isLoading,
      error,
      refetch,
      updateStatus,
      updateStatusMutation,
      pendingRequests,
      acceptedRequests,
      rejectedRequests,
   }
}

export function useContactRequestsPagination() {
   const [currentPage, setCurrentPage] = useState(1)
   const [pageSize] = useState(10)
   const [status, setStatus] = useState<"pending" | "accepted" | "rejected" | undefined>(undefined)

   const {
      data,
      meta,
      isLoading,
      error,
      refetch,
      updateStatus,
      pendingRequests,
      acceptedRequests,
      rejectedRequests,
   } = useContactRequests({
      page: currentPage,
      limit: pageSize,
      status,
   })

   const goToPage = (page: number) => {
      setCurrentPage(Math.max(1, Math.min(page, meta?.totalPages || 1)))
   }

   const nextPage = () => {
      if (meta?.hasNext) {
         goToPage(currentPage + 1)
      }
   }

   const prevPage = () => {
      if (meta?.hasPrev) {
         goToPage(currentPage - 1)
      }
   }

   const filterByStatus = (newStatus: "pending" | "accepted" | "rejected" | undefined) => {
      setStatus(newStatus)
      setCurrentPage(1) // Reset to first page when filter changes
   }

   return {
      data,
      meta,
      currentPage,
      pageSize,
      status,
      isLoading,
      error,
      refetch,
      updateStatus,
      pendingRequests,
      acceptedRequests,
      rejectedRequests,
      goToPage,
      nextPage,
      prevPage,
      filterByStatus,
   }
}
