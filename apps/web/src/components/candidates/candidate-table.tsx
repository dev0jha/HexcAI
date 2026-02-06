import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"

import {
   CandidateCard,
   CandidatesFilters,
   CandidatesHeader,
} from "@/components/candidates/candidates-components"

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

interface CandidateTableProps {
   candidates: Candidate[]
   onViewProfile: (username: string) => void
   onMessage: (candidate: Candidate) => void
   onRemove: (id: string) => void
}

export function CandidateTable({
   candidates,
   onViewProfile,
   onMessage,
   onRemove,
}: CandidateTableProps) {
   return (
      <div className="border rounded-md shadow-sm bg-card">
         <TableHeader>
            <TableRow>
               <TableHead className="w-75">Candidate</TableHead>
               <TableHead>Score</TableHead>
               <TableHead>Status</TableHead>
               <TableHead className="hidden md:table-cell">Tech Stack</TableHead>
               <TableHead className="hidden md:table-cell">Location</TableHead>
               <TableHead className="text-right">Actions</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {candidates.length > 0 ? (
               candidates.map(candidate => (
                  <CandidateCard
                     key={candidate.id}
                     candidate={candidate}
                     onViewProfile={onViewProfile}
                     onMessage={onMessage}
                     onRemove={onRemove}
                  />
               ))
            ) : (
               <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                     No results found.
                  </TableCell>
               </TableRow>
            )}
         </TableBody>
      </div>
   )
}
