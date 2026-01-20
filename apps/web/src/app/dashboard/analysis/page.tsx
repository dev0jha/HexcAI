"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import AnalysisCanvas from "@/components/analysis-canvas"
import {
  Github,
  Search,
  Loader2,
  Code2,
  Shield,
  GitBranch,
  FileText,
  Layers,
  CheckCircle,
} from "lucide-react"
import { useAnalysis } from "@/hooks/screens/analysis.hook"

const scoreCategories = [
  { name: "Code Quality", icon: Code2, weight: "30%" },
  { name: "Architecture", icon: Layers, weight: "20%" },
  { name: "Security", icon: Shield, weight: "20%" },
  { name: "Git Practices", icon: GitBranch, weight: "15%" },
  { name: "Documentation", icon: FileText, weight: "15%" },
]

export default function AnalyzePage() {
  const {
    state,
    repoUrl,
    setRepoUrl,
    handleAnalyze,
    scoreValues,
    isError,
    isComplete,
    isAnalyzing,
  } = useAnalysis()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mt-4 sm:mt-6">
      <div className="space-y-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Analyze Repository</h1>
          <p className="text-muted-foreground mt-1">
            Get AI-powered feedback on your GitHub project
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="repo-url">GitHub Repository URL</Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black dark:text-muted-foreground z-10 pointer-events-none" />
                  <Input
                    id="repo-url"
                    type="url"
                    placeholder="github.com/username/repo"
                    value={repoUrl}
                    onChange={e => setRepoUrl(e.target.value)}
                    className="pl-10"
                    disabled={isAnalyzing}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isAnalyzing || !repoUrl}
                  className="gap-2 sm:w-auto w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Analyzing
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>

          {isAnalyzing && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p className="text-sm">
                  {state.status === "responding" ? state.currentStatus : ""}
                </p>
              </div>
            </div>
          )}
        </Card>

        {isError && (
          <Card className="p-6 mt-8 border-destructive/50 bg-destructive/5">
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 rounded-full border-2 border-destructive flex items-center justify-center">
                <span className="text-destructive text-xs">!</span>
              </div>
              <p className="text-sm text-destructive">
                {state.status === "error" ? state.error : ""}
              </p>
            </div>
          </Card>
        )}

        {isComplete && state.status === "complete" && (
          <div className="space-y-8 mt-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Analysis Flow</h3>
              <AnalysisCanvas analysisResult={state.result} />
            </Card>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{state.result.name}</h2>
                    <p className="text-sm text-muted-foreground">{state.result.url}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Score</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-primary">
                        {state.result.totalScore}
                      </span>
                      <span className="text-muted-foreground">/100</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="outline">{state.result.language}</Badge>
                  <Badge variant="outline">{state.result.stars} stars</Badge>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Score Breakdown</h3>
                  {scoreCategories.map((category, index) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <category.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{category.weight}</span>
                          <span className="text-sm font-semibold">{scoreValues[index]}</span>
                        </div>
                      </div>
                      <Progress value={scoreValues[index]} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">AI Feedback</h3>
                <div className="space-y-4">
                  {state.result.feedback.map((item: string, index: number) => (
                    <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="mt-0.5">
                        {index < 2 ? (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-warning flex items-center justify-center">
                            <span className="text-warning text-xs">!</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg border border-primary/20 bg-primary/5">
                  <p className="text-sm font-medium text-primary">Pro Tip</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Focus on improving your documentation score by adding comprehensive README files
                    and inline code comments.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
