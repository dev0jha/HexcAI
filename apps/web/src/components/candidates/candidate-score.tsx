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

interface CandidateScoreProps {
   score: number
   className?: string
}

export function CandidateScore({ score, className }: CandidateScoreProps) {
   const getColorClass = (score: number) => {
      if (score >= 90) return "text-emerald-600"
      if (score >= 80) return "text-amber-600"
      return "text-muted-foreground"
   }

   return (
      <div className={cn("font-semibold text-sm", getColorClass(score), className)}>{score}</div>
   )
}
