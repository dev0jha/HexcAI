"use client";

import { useState, useEffect } from "react"
import { Label, Pie, PieChart, Sector } from "recharts";
import { type PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import type { ScoreBreakdown } from "@/types";

const chartConfig = {
  score: {
    label: "Score",
  },
  codeQuality: {
    label: "Code Quality",
    color: "#3b82f6",
  },
  architecture: {
    label: "Architecture",
    color: "#8b5cf6",
  },
  security: {
    label: "Security",
    color: "#ec4899",
  },
  gitPractices: {
    label: "Git Practices",
    color: "#f59e0b",
  },
  documentation: {
    label: "Documentation",
    color: "#10b981",
  },
} satisfies ChartConfig;

interface ScorePieChartProps {
  scores: ScoreBreakdown;
  totalScore: number;
}

const ScorePieChart = ({ scores, totalScore }: ScorePieChartProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const chartData = [
    {
      category: "codeQuality",
      score: scores.codeQuality,
      fill: "#3b82f6",
      label: "Code Quality",
    },
    {
      category: "architecture",
      score: scores.architecture,
      fill: "#8b5cf6",
      label: "Architecture",
    },
    {
      category: "security",
      score: scores.security,
      fill: "#ec4899",
      label: "Security",
    },
    {
      category: "gitPractices",
      score: scores.gitPractices,
      fill: "#f59e0b",
      label: "Git Practices",
    },
    {
      category: "documentation",
      score: scores.documentation,
      fill: "#10b981",
      label: "Documentation",
    },
  ];

  const averageScore = totalScore;

  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-4">Score Distribution</h3>
      {mounted && (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] sm:max-h-[300px]"
          id="score-distribution"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* @ts-ignore */}
            <Pie
              data={chartData}
              dataKey="score"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {averageScore}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          Overall Score
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      )}
      <div className="mt-4 flex flex-col gap-2 items-center">
        <div className="flex items-center gap-2 font-medium leading-none text-sm">
          {averageScore >= 85 ? (
            <>
              Excellent performance <TrendingUp className="h-4 w-4 text-green-500" />
            </>
          ) : averageScore >= 70 ? (
            <>
              Strong performance <TrendingUp className="h-4 w-4 text-blue-500" />
            </>
          ) : (
            <>
              Room for improvement
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground text-xs">
          Analysis based on repository metrics
        </div>
      </div>
    </div>
  );
};

export default ScorePieChart;
