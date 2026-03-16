"use client"

import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { contactRequestQueries } from "@/lib/queries/queryOptions"

import type { ContactRequestQuery } from "@/lib/queries/query.types"
import type { ContactRequest } from "@/types"

export function useSentContactRequests(query: ContactRequestQuery = {}) {
   const { data: response, isLoading, error, refetch } = useQuery(contactRequestQueries.sent(query))

   const pendingRequests = response?.data?.filter(r => r.status === "pending") ?? []
   const acceptedRequests = response?.data?.filter(r => r.status === "accepted") ?? []
   const rejectedRequests = response?.data?.filter(r => r.status === "rejected") ?? []

   return {
      data: response?.data ?? [],
      meta: response?.meta,
      isLoading,
      error,
      refetch,
      pendingRequests,
      acceptedRequests,
      rejectedRequests,
   }
}

export function useSentContactRequestsPagination() {
   const [currentPage, setCurrentPage] = useState(1)
   const [pageSize] = useState(10)
   const [status, setStatus] = useState<"pending" | "accepted" | "rejected" | undefined>(undefined)

   const {
      data,
      meta,
      isLoading,
      error,
      refetch,
      pendingRequests,
      acceptedRequests,
      rejectedRequests,
   } = useSentContactRequests({
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
      setCurrentPage(1)
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
      pendingRequests,
      acceptedRequests,
      rejectedRequests,
      goToPage,
      nextPage,
      prevPage,
      filterByStatus,
   }
}
