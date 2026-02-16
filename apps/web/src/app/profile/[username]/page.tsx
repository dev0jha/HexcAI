import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ChevronRight } from "lucide-react"

import type { AnalyzedRepo } from "@/types"

const mockAnalysisResult: AnalyzedRepo = {
   id: "ar1",
   name: "next-ecommerce",
   url: "https://github.com/example/next-ecommerce",
   description: "A full-stack e-commerce platform built with Next.js and Stripe",
   language: "TypeScript",
   stars: 234,
   analyzedAt: new Date(),
   scores: {
      codeQuality: 92,
      architecture: 88,
      security: 85,
      gitPractices: 90,
      documentation: 78,
   },
   totalScore: 87,
   feedback: [
      "Excellent use of TypeScript with proper type definitions throughout the codebase",
      "Well-structured component architecture following React best practices",
      "Consider adding more comprehensive error handling in API routes",
      "Security practices are solid, but consider implementing rate limiting",
      "Documentation could be improved with API endpoint descriptions",
   ],
}
import { DevelopersService } from "@/server/services/developers/developers.service"
import { Button } from "@/components/ui/button"
import { ProfileHeader } from "@/components/recruiter/profile-header"
import { AnalysisSection } from "@/components/recruiter/analysis-section"
import { FeaturedProject } from "@/components/recruiter/featured-projects"
import { HiringCallToAction } from "@/components/recruiter/hiring-cta"

interface ProfilePageProps {
   params: Promise<{ username: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
   const { username } = await params
   const result = await DevelopersService.getDeveloperByUsername({
      params: {
         username,
      },
   })

   if (!result.success || !result.data.developer) {
      notFound()
   }

   const developer = result.data.developer

   return (
      <div className="min-h-3 text-zinc-100 font-sans selection:bg-netural-800">
         <main className="pt-10 pb-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
               <nav className="flex items-center justify-between mb-8 px-3">
                  <Button
                     variant="ghost"
                     size="sm"
                     className="group h-9 px-3 -ml-3 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/50 rounded-sm transition-all border-amber-50/10 border-dashed"
                  >
                     <Link href="/" className="flex items-center gap-1">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        <span className="font-medium">Back</span>
                     </Link>
                  </Button>

                  <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-zinc-600">
                     <span className="hover:text-zinc-400 transition-colors cursor-default">
                        Developers
                     </span>
                     <ChevronRight className="h-3 w-3 text-zinc-700" />
                     <span className="text-zinc-400">Profile</span>
                  </div>
               </nav>

               <div className="space-y-6">
                  {/* Top Section */}
                  <ProfileHeader developer={developer!} />

                  {/* Grid Layout: Stats & Projects */}
                  <div className="grid gap-6 md:grid-cols-12">
                     <div className="md:col-span-5 lg:col-span-4 h-full">
                        <AnalysisSection
                           scores={mockAnalysisResult.scores}
                           totalScore={developer.score}
                        />
                     </div>

                     {/* Right Column: Project & CTA (8/12) */}
                     <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6">
                        <FeaturedProject project={mockAnalysisResult} />

                        <HiringCallToAction
                           isOpen={developer.isOpenToRecruiters!}
                           score={developer.score}
                           firstName={developer.name.split(" ")[0]}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </main>
      </div>
   )
}
