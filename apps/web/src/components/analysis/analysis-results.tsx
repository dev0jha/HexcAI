import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import AnalysisCanvas from "@/components/analysis/analysis-canvas"
import {
  IconCheck,
  IconCode,
  IconFileText,
  IconGitBranch,
  IconLayersOff,
  IconShield,
  IconCheck,
} from "@tabler/icons-react"

import { Card } from "@/components/ui/card"
import { useAnalysisState } from "@/hooks/screens/analysis.hooks"

const scoreCategories = [
  { name: "Code Quality", icon: IconCode, weight: "30%" },
  { name: "Architecture", icon: IconLayersOff, weight: "20%" },
  { name: "Security", icon: IconShield, weight: "20%" },
  { name: "Git Practices", icon: IconGitBranch, weight: "15%" },
  { name: "Documentation", icon: IconFileText, weight: "15%" },
]

export function Results() {
  const { state, isComplete, scoreValues } = useAnalysisState()

  return (
    <>
      {isComplete && state.status === "complete" && (
        <div className="space-y-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Analysis Flow</h3>
            <AnalysisCanvas analysisResult={state.result} />
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Score */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6 gap-4">
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

            {/* Feedback */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">AI Feedback</h3>

              <div className="space-y-4">
                {state.result.feedback.map((item: string, index: number) => (
                  <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="mt-0.5">
                      {index < 2 ? (
                        <IconCheck className="h-5 w-5 text-primary" />
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
                  Improve documentation with a strong README and inline comments.
                </p>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}
