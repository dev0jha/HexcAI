import Image from "next/image"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { getScoreLabel, type Developer } from "@/types"

interface LeaderboardProps {
   candidates: Developer[]
}

export function Leaderboard({ candidates }: LeaderboardProps) {
   const topThree = candidates.slice(0, 3)
   const rest = candidates.slice(3)

   return (
      <div className="space-y-8">
         <div className="flex flex-col md:flex-row items-center md:items-end justify-center gap-4 md:gap-6 md:px-4">
            {topThree.map((candidate, index) => (
               <TopThreeCard key={candidate.id} candidate={candidate} rank={index + 1} />
            ))}
         </div>

         <div className="space-y-3">
            {rest.map((candidate, index) => (
               <LeaderboardRow key={candidate.id} candidate={candidate} rank={index + 4} />
            ))}
         </div>
      </div>
   )
}

function TopThreeCard({ candidate, rank }: { candidate: Developer; rank: number }) {
   const barHeights = ["h-48", "h-36", "h-28"]
   const barColors = ["bg-amber-500", "bg-zinc-400", "bg-amber-700"]
   const iconColors = ["text-amber-400", "text-zinc-300", "text-amber-600"]

   const orderClass = rank === 1 ? "order-2" : rank === 2 ? "order-1" : "order-3"

   return (
      <Link href={`/profile/${candidate.username}`} className={`w-full md:w-auto ${orderClass}`}>
         <div
            className={`w-full md:w-48 flex flex-col items-center p-4 rounded-xl border border-zinc-800 bg-neutral-900/40 hover:border-zinc-700 transition-colors cursor-pointer relative overflow-hidden`}
         >
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_6px)]"></div>

            <div className="relative">
               <RankIcon rank={rank} iconColor={iconColors[rank - 1]} />
            </div>

            <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 mt-3 mb-4">
               <Image
                  src={candidate.avatar || "/placeholder.svg"}
                  alt={candidate.name}
                  fill
                  unoptimized
                  className="object-cover"
               />
            </div>

            <div className="text-center w-full relative">
               <h3 className="font-semibold text-zinc-100 truncate w-full">{candidate.name}</h3>
               <p className="text-xs text-zinc-500">@{candidate.username}</p>
            </div>

            <div className="w-full mt-4 relative">
               <div
                  className={`w-full ${barHeights[rank - 1]} ${barColors[rank - 1]} rounded-lg flex items-end justify-center pb-2`}
               >
                  <span className="text-xl font-bold text-zinc-900">{candidate.score}</span>
               </div>
            </div>

            <div className="flex flex-wrap justify-center gap-1 mt-3 relative">
               {candidate.techStack.slice(0, 2).map(tech => (
                  <Badge
                     key={tech}
                     variant="secondary"
                     size="sm"
                     className="bg-zinc-800/50 text-zinc-400 border-zinc-800/50 text-xs"
                  >
                     {tech}
                  </Badge>
               ))}
            </div>

            {candidate.isOpenToRecruiters && candidate.score >= 80 && (
               <div className="mt-3 flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] text-emerald-400">Open to hire</span>
               </div>
            )}
         </div>
      </Link>
   )
}

function RankIcon({ rank, iconColor }: { rank: number; iconBgColor?: string; iconColor: string }) {
   const glassmorphismStyles = "backdrop-blur-md bg-white/10 border border-white/20"

   return (
      <div
         className={`relative flex h-12 w-12 items-center justify-center rounded-xl ${glassmorphismStyles}`}
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className={`h-7 w-7 ${iconColor}`}
         >
            <rect width="256" height="256" fill="none" />
            <line
               x1="96"
               y1="224"
               x2="160"
               y2="224"
               fill="none"
               stroke="currentColor"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="16"
            />
            <line
               x1="128"
               y1="184"
               x2="128"
               y2="224"
               fill="none"
               stroke="currentColor"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="16"
            />
            <path
               d="M58,128H48A32,32,0,0,1,16,96V80a8,8,0,0,1,8-8H56"
               fill="none"
               stroke="currentColor"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="16"
            />
            <path
               d="M198,128h10a32,32,0,0,0,32-32V80a8,8,0,0,0-8-8H200"
               fill="none"
               stroke="currentColor"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="16"
            />
            <path
               d="M56,48H200v63.1c0,39.7-31.75,72.6-71.45,72.9A72,72,0,0,1,56,112Z"
               fill="none"
               stroke="currentColor"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth="16"
            />
         </svg>
      </div>
   )
}

function LeaderboardRow({ candidate, rank }: { candidate: Developer; rank: number }) {
   return (
      <Link href={`/profile/${candidate.username}`}>
         <div className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-neutral-900/40 p-3 hover:border-zinc-700 transition-colors relative overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_6px)]"></div>

            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800/50 border border-zinc-700">
               <span className="text-sm font-bold text-zinc-400">#{rank}</span>
            </div>

            <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
               <Image
                  src={candidate.avatar || "/placeholder.svg"}
                  alt={candidate.name}
                  fill
                  unoptimized
                  className="object-cover"
               />
            </div>

            <div className="relative flex-1 min-w-0">
               <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-zinc-100 truncate">{candidate.name}</h3>
                  {candidate.isOpenToRecruiters && candidate.score >= 80 && (
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                     </span>
                  )}
               </div>
               <p className="text-xs text-zinc-500">@{candidate.username}</p>
            </div>

            <div className="relative hidden sm:flex gap-1">
               {candidate.techStack.slice(0, 2).map(tech => (
                  <Badge
                     key={tech}
                     variant="secondary"
                     size="sm"
                     className="bg-zinc-800/50 text-zinc-400 border-zinc-800/50 text-xs"
                  >
                     {tech}
                  </Badge>
               ))}
            </div>

            <div className="relative flex items-center gap-2">
               <span className="text-xl font-bold text-zinc-100">{candidate.score}</span>
            </div>
         </div>
      </Link>
   )
}

const mockCandidates: Developer[] = [
   {
      id: "1",
      email: "arpit@example.com",
      name: "Arpit Yadav",
      role: "developer",
      username: "arpityadav",
      bio: "Full-stack developer passionate about building scalable systems",
      location: "India",
      techStack: ["React", "Node.js", "TypeScript", "Python", "PostgreSQL"],
      score: 95,
      isOpenToRecruiters: true,
      avatar: "https://avatars.githubusercontent.com/u/118053362?v=4",
      createdAt: new Date(),
   },
   {
      id: "2",
      email: "dev@example.com",
      name: "Dev Hari Ojha",
      role: "developer",
      username: "devhariojha",
      bio: "Full Stack Developer specializing in modern web technologies",
      location: "India",
      techStack: ["Next.js", "TypeScript", "TailwindCSS", "Prisma"],
      score: 92,
      isOpenToRecruiters: true,
      avatar: "https://avatars.githubusercontent.com/u/155317634?v=4",
      createdAt: new Date(),
   },
   {
      id: "3",
      email: "pallav@example.com",
      name: "Pallav Rai",
      role: "developer",
      username: "pallavrai",
      bio: "Backend Developer with expertise in distributed systems",
      location: "India",
      techStack: ["Go", "Rust", "Kubernetes", "Docker", "gRPC"],
      score: 89,
      isOpenToRecruiters: true,
      avatar: "https://avatars.githubusercontent.com/u/33592027?v=4",
      createdAt: new Date(),
   },
   {
      id: "4",
      email: "alex@example.com",
      name: "Alex Chen",
      role: "developer",
      username: "alexchen",
      bio: "Mobile developer focused on cross-platform solutions",
      location: "USA",
      techStack: ["React Native", "Flutter", "Swift", "Kotlin"],
      score: 87,
      isOpenToRecruiters: true,
      avatar: "https://avatars.githubusercontent.com/u/1234567?v=4",
      createdAt: new Date(),
   },
   {
      id: "5",
      email: "sarah@example.com",
      name: "Sarah Johnson",
      role: "developer",
      username: "sarahjohnson",
      bio: "DevOps engineer passionate about CI/CD and infrastructure",
      location: "UK",
      techStack: ["AWS", "Terraform", "Python", "Bash", "Docker"],
      score: 85,
      isOpenToRecruiters: false,
      avatar: "https://avatars.githubusercontent.com/u/2345678?v=4",
      createdAt: new Date(),
   },
   {
      id: "6",
      email: "mike@example.com",
      name: "Mike Williams",
      role: "developer",
      username: "mikewilliams",
      bio: "Frontend developer specializing in accessibility and performance",
      location: "Canada",
      techStack: ["Vue.js", "Nuxt", "TypeScript", "CSS", "Vitest"],
      score: 82,
      isOpenToRecruiters: true,
      avatar: "https://avatars.githubusercontent.com/u/3456789?v=4",
      createdAt: new Date(),
   },
]

export function LeaderboardWithData() {
   return <Leaderboard candidates={mockCandidates} />
}
