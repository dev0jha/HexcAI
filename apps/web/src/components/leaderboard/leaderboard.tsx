import Image from "next/image"
import Link from "next/link"

import { type Developer } from "@/types"

interface LeaderboardProps {
   candidates: Developer[]
}

export function Leaderboard({ candidates }: LeaderboardProps) {
   const topThree = candidates.slice(0, 3)
   const rest = candidates.slice(3)

   return (
      <div className="space-y-8">
         <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div>
               <h1 className="font-poppins text-4xl md:text-5xl font-bold tracking-tight flex items-center gap-2">
                  <span className="text-zinc-100">LEADER</span>
                  <span className="text-[#71717B]">BOARD</span>
               </h1>
               <p className="mt-2 text-base" style={{ color: "#74747B" }}>
                  A good developer doesn't need introduction
               </p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:items-end">
            {topThree[1] && <TopThreeCard candidate={topThree[1]} rank={2} />}

            {topThree[0] && (
               <div className="md:-mt-8 order-first md:order-0">
                  <TopThreeCard candidate={topThree[0]} rank={1} isFirst />
               </div>
            )}

            {topThree[2] && <TopThreeCard candidate={topThree[2]} rank={3} />}
         </div>

         <div className="flex flex-col gap-5">
            {rest.map((candidate, index) => (
               <LeaderboardRow key={candidate.id} candidate={candidate} rank={index + 4} />
            ))}
         </div>
      </div>
   )
}

function TopThreeCard({
   candidate,
   rank,
   isFirst = false,
}: {
   candidate: Developer
   rank: number
   isFirst?: boolean
}) {
   return (
      <Link href={`/profile/${candidate.username}`}>
         <div
            className={`relative rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 hover:border-zinc-700 transition-all group overflow-hidden ${
               isFirst ? "md:p-6" : ""
            }`}
         >
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_6px)]"></div>

            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
               <div className="absolute top-2 right-2 w-2 h-2 bg-zinc-600 rounded-full opacity-60"></div>
               <div className="absolute top-2 right-6 w-1 h-1 bg-zinc-600/40 rounded-full"></div>
               <div className="absolute top-6 right-2 w-1 h-1 bg-zinc-600/40 rounded-full"></div>
            </div>

            <div className="absolute top-4 left-4 flex items-center gap-1">
               <span className="text-zinc-400 font-mono text-xs">0{rank}</span>
            </div>

            <div className="flex flex-col items-center pt-4">
               <div className={`relative ${isFirst ? "h-24 w-24" : "h-20 w-20"} mb-4`}>
                  <div className="relative h-full w-full overflow-hidden rounded-xl border-2 border-zinc-700 bg-zinc-800">
                     <Image
                        src={candidate.avatar || "/placeholder.svg"}
                        alt={candidate.name}
                        fill
                        unoptimized
                        className="object-cover"
                     />
                  </div>

                  {candidate.isOpenToRecruiters && candidate.score >= 80 && (
                     <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-zinc-900 flex items-center justify-center">
                        <div className="h-2 w-2 bg-emerald-400 rounded-full"></div>
                     </div>
                  )}
               </div>

               <h3
                  className={`font-bold text-zinc-100 uppercase tracking-wide ${isFirst ? "text-lg" : "text-base"}`}
               >
                  {formatUsername(candidate.username)}
               </h3>
               <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">
                  {getRoleForCandidate(candidate)}
               </p>

               {/* Tech stack badges */}
               <div className="flex flex-wrap justify-center gap-2 mt-3">
                  {candidate.techStack?.map(tech => (
                     <span
                        key={tech}
                        className="bg-zinc-800 text-zinc-300 text-xs font-mono px-2 py-1 rounded-full border border-zinc-700"
                     >
                        {tech}
                     </span>
                  ))}
               </div>
               <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-zinc-500 font-mono">SCORE:</span>
                  <span className="text-2xl font-bold text-zinc-100">{candidate.score}</span>
               </div>
            </div>
         </div>
      </Link>
   )
}

function LeaderboardRow({ candidate, rank }: { candidate: Developer; rank: number }) {
   const percentage = Math.min(100, Math.max(0, candidate.score))

   return (
      <Link href={`/profile/${candidate.username}`}>
         <div className="relative flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-700 transition-all group overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_1px,transparent_6px)]"></div>

            <div className="relative w-10 text-center">
               <span className="text-lg font-bold text-zinc-500 font-mono">
                  {rank.toString().padStart(2, "0")}
               </span>
            </div>

            <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800 shrink-0">
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
                  <h3 className="font-semibold text-zinc-100 uppercase tracking-wide text-sm">
                     {formatUsername(candidate.username)}
                  </h3>
                  {candidate.isOpenToRecruiters && candidate.score >= 80 && (
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                     </span>
                  )}
               </div>
               <p className="text-xs text-zinc-500 uppercase tracking-wider">
                  {getRoleForCandidate(candidate)}
               </p>
               {/* Tech stack badges */}
               <div className="flex flex-wrap gap-2 mt-2">
                  {candidate.techStack?.map(tech => (
                     <span
                        key={tech}
                        className="bg-zinc-800 text-zinc-300 text-xs font-mono px-2 py-1 rounded-full border border-zinc-700"
                     >
                        {tech}
                     </span>
                  ))}
               </div>
            </div>

            <div className="relative hidden sm:flex flex-1 max-w-xs items-center gap-3">
               <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                     className="h-full bg-linear-to-r from-zinc-600 to-zinc-500 rounded-full transition-all duration-500"
                     style={{ width: `${percentage}%` }}
                  ></div>
               </div>
               <span className="text-xs text-zinc-400 font-mono w-10">{percentage}%</span>
            </div>

            <div className="relative text-right">
               <span className="text-2xl font-bold text-zinc-100">{candidate.score}</span>
            </div>
         </div>
      </Link>
   )
}

function formatUsername(username: string): string {
   return username.toUpperCase().replace(/([a-z])([A-Z])/g, "$1_$2")
}

function getRoleForCandidate(candidate: Developer): string {
   const tech = candidate.techStack[0]?.toLowerCase() || ""
   if (tech.includes("react") || tech.includes("vue") || tech.includes("next")) {
      return "FRONTEND DEVELOPER"
   }
   if (tech.includes("node") || tech.includes("go") || tech.includes("rust")) {
      return "BACKEND DEVELOPER"
   }
   if (tech.includes("aws") || tech.includes("docker") || tech.includes("kubernetes")) {
      return "DEVOPS SPECIALIST"
   }
   if (tech.includes("python") || tech.includes("tensorflow")) {
      return "DATA ENGINEER"
   }
   return "SR DEVELOPER"
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
      isVisible: true,
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
      isVisible: true,
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
      isVisible: true,
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
      isVisible: true,
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
      isVisible: true,
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
      isVisible: true,
      avatar: "https://avatars.githubusercontent.com/u/3456789?v=4",
      createdAt: new Date(),
   },
]

export function LeaderboardWithData() {
   return <Leaderboard candidates={mockCandidates} />
}
