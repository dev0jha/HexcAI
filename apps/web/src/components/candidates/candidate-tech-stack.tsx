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

interface CandidateTechStackProps {
   techStack: string[]
   className?: string
}

export function CandidateTechStack({ techStack, className }: CandidateTechStackProps) {
   return (
      <div className={cn("flex flex-wrap gap-1", className)}>
         {techStack.slice(0, 2).map(tech => (
            <Badge key={tech} variant="secondary" className="px-1.5 py-0 text-[10px] font-normal">
               {tech}
            </Badge>
         ))}
         {techStack.length > 2 && (
            <span className="text-xs text-muted-foreground pl-1">+{techStack.length - 2}</span>
         )}
      </div>
   )
}
