import ScorePieChart from "@/components/developer/score-pie-chart";
import { Card } from "@/components/ui/card";
import { mockAnalysisResult } from "@/data/mock-data";

export default function ResultsPage() {
  const result = mockAnalysisResult;

  return (
    <div className="container mx-auto mt-4 px-4 py-6 sm:mt-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <div className="space-y-8">
        <div className="mb-6">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Analysis Results</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Detailed breakdown of your repository analysis
            </p>
          </div>
        </div>

        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">{result.name}</h2>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm"
            >
              {result.url}
            </a>
          </div>

          <div className="mb-6 flex justify-center">
            <ScorePieChart
              scores={result.scores}
              totalScore={result.totalScore}
            />
          </div>

          <div className="mt-6">
            <h3 className="mb-4 font-semibold">AI Feedback</h3>
            <ul className="space-y-2">
              {result.feedback.map((item, index) => (
                <li
                  key={index}
                  className="text-muted-foreground border-primary border-l-2 pl-4 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
