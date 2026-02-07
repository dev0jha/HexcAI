"use client"

import { useQuery } from "@tanstack/react-query"

import type { DevelopersQuery } from "@/lib/queries/query.types"
import { developerQueries } from "@/lib/queries/queryOptions"

export function useDevelopers(query: DevelopersQuery = {}) {
   const { data: response, isLoading, error, refetch } = useQuery(developerQueries.list(query))

   const developers = (response as any)?.success ? (response as any).data.developers : []
   const meta = (response as any)?.success ? (response as any).data.meta : undefined
   const errorMessage = !(response as any)?.success ? (response as any)?.error : null

   return {
      data: developers,
      meta,
      isLoading,
      error,
      errorMessage,
      refetch,
   }
}

export function useTechStacks() {
   const { data: response, isLoading, error, refetch } = useQuery(developerQueries.techStacks())

   const techStacks = (response as any)?.success ? (response as any).data.techStacks : []
   const errorMessage = !(response as any)?.success ? (response as any)?.error : null

   return {
      data: techStacks,
      isLoading,
      error,
      errorMessage,
      refetch,
   }
}
