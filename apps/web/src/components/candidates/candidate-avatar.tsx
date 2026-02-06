import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

interface CandidateAvatarProps {
   name: string
   username: string
   avatar: string
   className?: string
}

export function CandidateAvatar({ name, username, avatar, className }: CandidateAvatarProps) {
   return (
      <Avatar className={`h-9 w-9 border ${className}`}>
         <AvatarImage src={avatar} alt={name} />
         <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
   )
}
