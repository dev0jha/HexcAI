import { Badge } from "@/components/ui/badge"

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

interface CandidateStatusProps {
   status: "pending" | "interested" | "not-interested"
}

export function CandidateStatus({ status }: CandidateStatusProps) {
   switch (status) {
      case "interested":
         return (
            <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-200">
               Interested
            </Badge>
         )
      case "pending":
         return (
            <Badge variant="secondary" className="text-muted-foreground">
               Pending
            </Badge>
         )
      case "not-interested":
         return (
            <Badge variant="outline" className="text-muted-foreground">
               Passed
            </Badge>
         )
      default:
         return <Badge variant="outline">{status}</Badge>
   }
}
