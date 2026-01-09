import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockAnalysisResult } from "@/data/mock-data"

export default function ResultsPage() {
  const result = mockAnalysisResult

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mt-4 sm:mt-6">
      <div className="space-y-8">
        <div className="mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Analysis Results</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Detailed breakdown of your repository analysis
            </p>
          </div>
        </div>

        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">{result.name}</h2>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                {result.url}
              </a>
            </div>
            <div className="text-right bg-transparent rounded-lg px-3 sm:px-4 py-2 sm:py-2 inline-block">
              <Badge variant="secondary" className="text-xl sm:text-2xl px-3 sm:px-4 py- sm:py-2 ">
                {result.totalScore}/100
              </Badge>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold">Score Breakdown</h3>
              {Object.entries(result.scores).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                    <span className="font-medium">{value}/100</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">AI Feedback</h3>
              <ul className="space-y-2">
                {result.feedback.map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground pl-4 border-l-2 border-primary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
