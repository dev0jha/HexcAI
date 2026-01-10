import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/core/Navbar"
import { Footer } from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { mockDevelopers, mockAnalysisResult } from "@/data/mock-data"
import { getScoreLabel } from "@/types"
import { MapPin, Globe, Linkedin, Github, Code2, Shield, GitBranch, FileText, Layers, ExternalLink } from "lucide-react"

const scoreCategories = [
  { key: "codeQuality", name: "Code Quality", icon: Code2 },
  { key: "architecture", name: "Architecture", icon: Layers },
  { key: "security", name: "Security", icon: Shield },
  { key: "gitPractices", name: "Git Practices", icon: GitBranch },
  { key: "documentation", name: "Documentation", icon: FileText },
]

interface ProfilePageProps {
  params: Promise<{ username: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params
  const developer = mockDevelopers.find((d) => d.username === username)

  if (!developer) {
    notFound()
  }

  const scoreLabel = getScoreLabel(developer.score)

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center md:items-start">
                <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20">
                  <Image
                    src={developer.avatar || "/placeholder.svg?height=128&width=128&query=developer portrait"}
                    alt={developer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {developer.isOpenToRecruiters && developer.score >= 80 && (
                  <Badge className="mt-4 bg-primary/20 text-primary">Open to opportunities</Badge>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold">{developer.name}</h1>
                <p className="text-muted-foreground">@{developer.username}</p>

                {developer.location && (
                  <div className="flex items-center justify-center md:justify-start gap-2 mt-3 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {developer.location}
                  </div>
                )}

                {developer.bio && <p className="mt-4 text-muted-foreground max-w-xl">{developer.bio}</p>}

                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                  {developer.website && (
                    <a
                      href={`https://${developer.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <Globe className="h-4 w-4" />
                      {developer.website}
                    </a>
                  )}
                  {developer.linkedIn && (
                    <a
                      href={`https://${developer.linkedIn}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                  <a href="#" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-center p-6 rounded-xl bg-card border border-border">
                  <p className="text-sm text-muted-foreground">Developer Score</p>
                  <div className="flex items-baseline justify-center gap-1 mt-1">
                    <span className="text-4xl font-bold text-primary">{developer.score}</span>
                    <span className="text-muted-foreground">/100</span>
                  </div>
                  <Badge variant="secondary" className="mt-2 bg-primary/20 text-primary">
                    {scoreLabel}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {developer.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          <div className="grid gap-6 mt-8 md:grid-cols-2">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Score Breakdown</h2>
              <div className="space-y-4">
                {scoreCategories.map((category) => {
                  const score = mockAnalysisResult.scores[category.key as keyof typeof mockAnalysisResult.scores]
                  return (
                    <div key={category.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <category.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <span className="text-sm font-semibold">{score}</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Featured Project</h2>
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{mockAnalysisResult.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{mockAnalysisResult.description}</p>
                  </div>
                  <Badge variant="secondary">{mockAnalysisResult.totalScore}</Badge>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline">{mockAnalysisResult.language}</Badge>
                  <Badge variant="outline">{mockAnalysisResult.stars} stars</Badge>
                </div>
                <a
                  href={mockAnalysisResult.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 mt-4 text-sm text-primary hover:underline"
                >
                  View on GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {developer.isOpenToRecruiters && developer.score >= 80 && (
                <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm font-medium text-primary">
                    Interested in hiring {developer.name.split(" ")[0]}?
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sign in as a recruiter to send a contact request.
                  </p>
                  <Link href="/login">
                    <Button className="mt-3" size="sm">
                      Contact Developer
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
