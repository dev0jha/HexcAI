"use client"

import { useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"

interface Candidate {
   id: string
   name: string
   username: string
   avatar: string
   score: number
   techStack: string[]
   location: string
   contactedDate: string
   status: "pending" | "interested" | "not-interested"
}

export function useCandidatesPage(initialCandidates: Candidate[] = []) {
   const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates)
   const [searchQuery, setSearchQuery] = useState("")
   const [statusFilter, setStatusFilter] = useState("all")
   const [isLoading, setIsLoading] = useState(false)

   // Use debounced search for filtering
   const debouncedSearchQuery = useDebounce(searchQuery, 300)

   // Filter logic
   const filteredCandidates = candidates.filter(candidate => {
      const matchesSearch =
         candidate.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
         candidate.techStack.some(tech =>
            tech.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
         )

      const matchesStatus = statusFilter === "all" || candidate.status === statusFilter

      return matchesSearch && matchesStatus
   })

   const handleRemove = (id: string) => {
      setCandidates(candidates.filter(c => c.id !== id))
   }

   const handleSetCandidates = (newCandidates: Candidate[]) => {
      setCandidates(newCandidates)
      setIsLoading(false)
   }

   return {
      // State
      candidates,
      filteredCandidates,
      searchQuery,
      setSearchQuery,
      statusFilter,
      setStatusFilter,
      isLoading,

      // Computed
      filteredCount: filteredCandidates.length,

      // Actions
      handleRemove,
      handleSetCandidates,
   }
}
