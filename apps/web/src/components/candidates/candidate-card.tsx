import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

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

interface CandidateCardProps {
   candidate: Candidate
   onViewProfile: (username: string) => void
   onMessage: (candidate: Candidate) => void
   onRemove: (id: string) => void
}

export function CandidateCard({
   candidate,
   onViewProfile,
   onMessage,
   onRemove,
}: CandidateCardProps) {
   const getColorClass = (score: number) => {
      if (score >= 90) return "text-emerald-600"
      if (score >= 80) return "text-amber-600"
      return "text-muted-foreground"
   }

   return (
      <tr key={candidate.id}>
         {/* Candidate Name & Avatar */}
         <td className="w-75">
            <div className="flex items-center gap-3">
               <div className="h-9 w-9 border rounded-full overflow-hidden bg-muted">
                  <img
                     src={candidate.avatar}
                     alt={candidate.name}
                     className="h-full w-full object-cover"
                  />
               </div>
               <div className="flex flex-col">
                  <span className="font-medium text-sm text-foreground">{candidate.name}</span>
                  <span className="text-xs text-muted-foreground">@{candidate.username}</span>
               </div>
            </div>
         </td>

         {/* Score */}
         <td>
            <div className={cn("font-semibold text-sm", getColorClass(candidate.score))}>
               {candidate.score}
            </div>
         </td>

         {/* Status */}
         <td>
            <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-200">
               Interested
            </Badge>
         </td>

         {/* Tech Stack (Truncated) */}
         <td className="hidden md:table-cell max-w-50">
            <div className="flex flex-wrap gap-1">
               {candidate.techStack.slice(0, 2).map(tech => (
                  <Badge
                     key={tech}
                     variant="secondary"
                     className="px-1.5 py-0 text-[10px] font-normal"
                  >
                     {tech}
                  </Badge>
               ))}
               {candidate.techStack.length > 2 && (
                  <span className="text-xs text-muted-foreground pl-1">
                     +{candidate.techStack.length - 2}
                  </span>
               )}
            </div>
         </td>

         {/* Location & Date */}
         <td className="hidden md:table-cell">
            <div className="flex flex-col">
               <span className="text-sm text-foreground">{candidate.location}</span>
               <span className="text-xs text-muted-foreground">
                  {new Date(candidate.contactedDate).toLocaleDateString()}
               </span>
            </div>
         </td>

         {/* Actions Dropdown */}
         <td className="text-right">
            <div className="flex items-center gap-2">
               <button
                  onClick={() => onViewProfile(candidate.username)}
                  className="text-xs bg-muted hover:bg-accent px-2 py-1 rounded transition-colors"
               >
                  View Profile
               </button>
               <button
                  onClick={() => onMessage(candidate)}
                  className="text-xs bg-muted hover:bg-accent px-2 py-1 rounded transition-colors"
               >
                  Message
               </button>
               <button
                  onClick={() => onRemove(candidate.id)}
                  className="text-xs bg-destructive hover:bg-destructive/90 text-destructive-foreground px-2 py-1 rounded transition-colors"
               >
                  Remove
               </button>
            </div>
         </td>
      </tr>
   )
}
