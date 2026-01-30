import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Code2,
  ExternalLink,
  FileText,
  GitBranch,
  Github,
  Globe,
  Layers,
  Linkedin,
  MapPin,
  PlusIcon,
  Shield,
} from "lucide-react";

import ScorePieChart from "@/components/developer/score-pie-chart";
import Footer from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockAnalysisResult, mockDevelopers } from "@/data/mock-data";
import { getScoreLabel } from "@/types";

const scoreCategories = [
  { key: "codeQuality", name: "Code Quality", icon: Code2 },
  { key: "architecture", name: "Architecture", icon: Layers },
  { key: "security", name: "Security", icon: Shield },
  { key: "gitPractices", name: "Git Practices", icon: GitBranch },
  { key: "documentation", name: "Documentation", icon: FileText },
];

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const developer = mockDevelopers.find((d) => d.username === username);

  if (!developer) {
    notFound();
  }

  const scoreLabel = getScoreLabel(developer.score);

  return (
    <div className="min-h-screen bg-black">
      <main className="pt-20 pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-none border-1 border-dashed bg-transparent p-6 before:rounded-none">
            <PlusIcon
              className="absolute -top-[12.5px] -left-[12.5px] h-6 w-6 text-zinc-600"
              strokeWidth={2}
            />
            <PlusIcon
              className="absolute -top-[12.5px] -right-[12.5px] h-6 w-6 text-zinc-600"
              strokeWidth={2}
            />
            <PlusIcon
              className="absolute -bottom-[12.5px] -left-[12.5px] h-6 w-6 text-zinc-600"
              strokeWidth={2}
            />
            <PlusIcon
              className="absolute -right-[12.5px] -bottom-[12.5px] h-6 w-6 text-zinc-600"
              strokeWidth={2}
            />
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex flex-col items-center md:items-start">
                <div className="border-primary/20 relative h-32 w-32 overflow-hidden rounded-full border-4">
                  <Image
                    src={
                      developer.avatar ||
                      "/placeholder.svg?height=128&width=128&query=developer portrait"
                    }
                    alt={developer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {developer.isOpenToRecruiters && developer.score >= 80 && (
                  <Badge className="bg-primary/20 text-primary mt-4">
                    Open to opportunities
                  </Badge>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="font-poppins text-3xl font-bold">
                  {developer.name}
                </h1>
                <p className="text-muted-foreground">@{developer.username}</p>

                {developer.location && (
                  <div className="text-muted-foreground flex items-center justify-center md:justify-start">
                    <MapPin className="h-4 w-4" />
                    {developer.location}
                  </div>
                )}

                {developer.bio && (
                  <p className="text-muted-foreground mt-4 max-w-xl">
                    {developer.bio}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
                  {developer.website && (
                    <a
                      href={`https://${developer.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm"
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
                      className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="rounded-xl border border-dashed bg-transparent p-6 text-center">
                  <p className="text-muted-foreground text-sm">
                    Developer Score
                  </p>
                  <div className="mt-1 flex items-baseline justify-center gap-1">
                    <span className="text-primary text-4xl font-bold">
                      {developer.score}
                    </span>
                    <span className="text-muted-foreground">/100</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-primary/20 text-primary mt-2"
                  >
                    {scoreLabel}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-lg font-semibold">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {developer.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card className="relative rounded-none border-1 border-dashed bg-transparent p-6 before:rounded-none">
              <PlusIcon
                className="absolute -top-[12.5px] -left-[12.5px] h-6 w-6 text-zinc-600"
                strokeWidth={2}
              />
              <PlusIcon
                className="absolute -top-[12.5px] -right-[12.5px] h-6 w-6 text-zinc-600"
                strokeWidth={2}
              />
              <PlusIcon
                className="absolute -bottom-[12.5px] -left-[12.5px] h-6 w-6 text-zinc-600"
                strokeWidth={2}
              />
              <PlusIcon
                className="absolute -right-[12.5px] -bottom-[12.5px] h-6 w-6 text-zinc-600"
                strokeWidth={2}
              />
              <h2 className="mb-4 text-lg font-semibold text-white">
                Score Breakdown
              </h2>
              <div className="flex items-center justify-center py-4">
                <ScorePieChart
                  scores={{
                    codeQuality: mockAnalysisResult.scores.codeQuality,
                    architecture: mockAnalysisResult.scores.architecture,
                    security: mockAnalysisResult.scores.security,
                    gitPractices: mockAnalysisResult.scores.gitPractices,
                    documentation: mockAnalysisResult.scores.documentation,
                  }}
                  totalScore={developer.score}
                />
              </div>
            </Card>

            <Card className="relative rounded-none border-1 border-dashed bg-transparent p-6 before:rounded-none">
              <PlusIcon
                className="absolute -top-[12.5px] -left-[12.5px] h-6 w-6"
                strokeWidth={2}
              />
              <PlusIcon
                className="absolute -top-[12.5px] -right-[12.5px] h-6 w-6"
                strokeWidth={2}
              />
              <PlusIcon
                className="absolute -bottom-[12.5px] -left-[12.5px] h-6 w-6"
                strokeWidth={2}
              />
              <PlusIcon
                className="absolute -right-[12.5px] -bottom-[12.5px] h-6 w-6"
                strokeWidth={2}
              />
              <h2 className="mb-4 text-lg font-semibold text-white">
                Featured Project
              </h2>
              <div className="border-border rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{mockAnalysisResult.name}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">
                      {mockAnalysisResult.description}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {mockAnalysisResult.totalScore}
                  </Badge>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline">{mockAnalysisResult.language}</Badge>
                  <Badge variant="outline">
                    {mockAnalysisResult.stars} stars
                  </Badge>
                </div>
                <a
                  href={mockAnalysisResult.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary mt-4 flex items-center gap-1 text-sm hover:underline"
                >
                  View on GitHub
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {developer.isOpenToRecruiters && developer.score >= 80 && (
                <div className="bg-primary/10 border-primary/20 mt-6 rounded-lg border p-4">
                  <p className="text-primary text-sm font-medium">
                    Interested in hiring {developer.name.split(" ")[0]}?
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm">
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
  );
}
