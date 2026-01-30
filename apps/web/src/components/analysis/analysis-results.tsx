import {
  IconCheck,
  IconCode,
  IconFileText,
  IconGitBranch,
  IconLayersOff,
  IconShield,
} from "@tabler/icons-react";

import AnalysisCanvas from "@/components/analysis/analysis-canvas";
import { DashboardCard } from "@/components/layout/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAnalysisState } from "@/hooks/screens/analysis.hooks";

const scoreCategories = [
  { name: "Code Quality", icon: IconCode, weight: "30%" },
  { name: "Architecture", icon: IconLayersOff, weight: "20%" },
  { name: "Security", icon: IconShield, weight: "20%" },
  { name: "Git Practices", icon: IconGitBranch, weight: "15%" },
  { name: "Documentation", icon: IconFileText, weight: "15%" },
];

export function Results() {
  const { state, isComplete, scoreValues } = useAnalysisState();

  return (
    <>
      {isComplete && state.status === "complete" && (
        <DashboardCard className="overflow-hidden border p-0">
          <div className="border-b border-white/5 bg-white/5 p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {state.result.name}
                </h2>
                <p className="mt-1 font-mono text-sm text-white/50">
                  {state.result.url}
                </p>
              </div>

              <div className="flex items-center gap-6 rounded-xl border border-white/5 bg-black/20 p-4">
                <div className="text-center">
                  <p className="mb-1 text-[10px] tracking-widest text-white/40 uppercase">
                    Language
                  </p>
                  <p className="text-sm font-semibold">
                    {state.result.language}
                  </p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                  <p className="mb-1 text-[10px] tracking-widest text-white/40 uppercase">
                    Stars
                  </p>
                  <p className="text-sm font-semibold">{state.result.stars}</p>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                  <p className="mb-1 text-[10px] tracking-widest text-white/40 uppercase">
                    Total Score
                  </p>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-xl font-bold text-white">
                      {state.result.totalScore}
                    </span>
                    <span className="text-[10px] text-white/40">/100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid divide-x divide-y divide-white/5 lg:grid-cols-3 lg:divide-y-0">
            <div className="flex flex-col lg:col-span-2">
              <div className="flex items-center justify-between border-b border-white/5 bg-white/5 p-4">
                <h3 className="flex items-center gap-2 text-sm font-medium">
                  <IconGitBranch className="h-4 w-4 text-white/60" />
                  Analysis Flow
                </h3>
              </div>
              <div className="relative min-h-[500px] flex-1 bg-black/40">
                <AnalysisCanvas analysisResult={state.result} />
              </div>
            </div>

            <div className="flex flex-col bg-black/20">
              <div className="border-b border-white/5 bg-white/5 p-4">
                <h3 className="flex items-center gap-2 text-sm font-medium">
                  <IconCode className="h-4 w-4 text-white/60" />
                  Score Breakdown
                </h3>
              </div>
              <div className="space-y-6 p-6">
                {scoreCategories.map((category, index) => (
                  <div key={category.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <category.icon className="h-4 w-4 text-white/40" />
                        <span className="text-xs tracking-wider text-white/60 uppercase">
                          {category.name}
                        </span>
                      </div>
                      <span className="font-mono text-sm font-bold">
                        {scoreValues[index]}%
                      </span>
                    </div>
                    <Progress
                      value={scoreValues[index]}
                      className="h-1.5 bg-white/5"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-auto border-t border-white/5 bg-white/5 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-medium">
                  <IconFileText className="h-4 w-4 text-white/60" />
                  AI Feedback
                </h3>
                <div className="space-y-3">
                  {state.result.feedback
                    .slice(0, 3)
                    .map((item: string, index: number) => (
                      <div
                        key={index}
                        className="flex gap-3 text-xs leading-relaxed text-white/70"
                      >
                        <div className="mt-1 shrink-0">
                          {index < 2 ? (
                            <div className="size-1.5 rounded-full bg-emerald-500" />
                          ) : (
                            <div className="size-1.5 rounded-full bg-amber-500" />
                          )}
                        </div>
                        <p>{item}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
      )}
    </>
  );
}
