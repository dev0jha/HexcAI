import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getScoreColor, getScoreLabel } from "@/types";

interface ScoreCardProps {
  score: number;
  showBreakdown?: boolean;
  breakdown?: {
    codeQuality: number;
    architecture: number;
    security: number;
    gitPractices: number;
    documentation: number;
  };
}

export function ScoreCard({ score, showBreakdown, breakdown }: ScoreCardProps) {
  const label = getScoreLabel(score);

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">Developer Score</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}
            </span>
            <span className="text-muted-foreground text-xl">/100</span>
          </div>
        </div>
        <Badge
          variant="secondary"
          className={`${score >= 80 ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}
        >
          {label}
        </Badge>
      </div>

      <Progress value={score} className="h-2" />

      {showBreakdown && breakdown && (
        <div className="mt-6 space-y-4">
          <p className="text-sm font-medium">Score Breakdown</p>
          {Object.entries(breakdown).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span className="font-medium">{value}</span>
              </div>
              <Progress value={value} className="h-1.5" />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
