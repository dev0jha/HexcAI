import { ExternalLink, Search } from "lucide-react"

interface CandidatesHeaderProps {
   candidateCount: number
   onExport: () => void
   onFindTalent: () => void
}

export function CandidatesHeader({
   candidateCount,
   onExport,
   onFindTalent,
}: CandidatesHeaderProps) {
   return (
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
         <div>
            <h1 className="text-2xl font-bold tracking-tight">My Candidates</h1>
            <p className="text-muted-foreground text-sm">
               Manage and track {candidateCount} developers you've contacted.
            </p>
         </div>
         <div className="flex items-center gap-2">
            <button
               onClick={onExport}
               className="px-4 py-2 border rounded hover:bg-accent transition-colors"
            >
               <ExternalLink className="h-4 w-4" />
               Export CSV
            </button>
            <button
               onClick={onFindTalent}
               className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
               <Search className="h-4 w-4" />
               Find Talent
            </button>
         </div>
      </div>
   )
}
