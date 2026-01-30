"use client";

import { useRef } from "react";

import { Cpu, Github, TrendingUp } from "lucide-react";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { useIsMobile } from "@/hooks/use-mobile";

export function GitHubAnalysisFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const githubRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  return (
    <div
      ref={containerRef}
      className="glass-card relative flex min-h-50 w-full flex-col justify-center rounded-3xl p-4 md:min-h-100 md:p-8"
    >
      <div className="flex flex-row items-center justify-between gap-3 md:gap-4">
        {/* GitHub Input */}
        <div className="flex flex-col items-center gap-1.5 md:gap-3">
          <div
            ref={githubRef}
            className="border-border bg-surface-2 hover:border-primary/50 hover:shadow-glow-sm z-10 flex h-12 w-12 items-center justify-center rounded-lg border-2 p-2 shadow-lg transition-all duration-300 md:h-20 md:w-20 md:rounded-2xl md:p-4"
          >
            <Github className="text-foreground h-6 w-6 md:h-10 md:w-10" />
          </div>
          <span className="text-muted-foreground text-center text-[10px] font-medium md:text-sm">
            Connect GitHub
          </span>
        </div>

        {/* AI Processing */}
        <div className="flex flex-col items-center gap-1.5 md:gap-3">
          <div
            ref={aiRef}
            className="border-primary/50 bg-primary/10 shadow-glow z-10 flex h-14 w-14 items-center justify-center rounded-lg border-2 p-2 md:h-24 md:w-24 md:rounded-2xl md:p-4"
          >
            <Cpu className="text-primary h-7 w-7 animate-pulse md:h-12 md:w-12" />
          </div>
          <span className="text-primary text-center text-[10px] font-medium md:text-sm">
            AI Analysis
          </span>
        </div>

        {/* Score Output */}
        <div className="flex flex-col items-center gap-1.5 md:gap-3">
          <div
            ref={scoreRef}
            className="border-border bg-surface-2 hover:border-success/50 z-10 flex h-12 w-12 items-center justify-center rounded-lg border-2 p-2 shadow-lg transition-all duration-300 md:h-20 md:w-20 md:rounded-2xl md:p-4"
          >
            <TrendingUp className="text-success h-6 w-6 md:h-10 md:w-10" />
          </div>
          <span className="text-muted-foreground tecon text-center text-[10px] font-medium md:text-sm">
            Developer Score
          </span>
        </div>
      </div>

      {/* Animated Beams - Only on Desktop */}
      {!isMobile && (
        <>
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={githubRef}
            toRef={aiRef}
            curvature={0}
            pathColor="hsl(var(--border))"
            pathWidth={2}
            pathOpacity={0.3}
            gradientStartColor="oklch(84.1% 0.238 128.85)"
            gradientStopColor="oklch(84.1% 0.238 128.85)"
            duration={4}
            startXOffset={40}
            endXOffset={-48}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={aiRef}
            toRef={scoreRef}
            curvature={0}
            pathColor="hsl(var(--border))"
            pathWidth={2}
            pathOpacity={0.3}
            gradientStartColor="oklch(84.1% 0.238 128.85)"
            gradientStopColor="oklch(84.1% 0.238 128.85)"
            duration={4}
            delay={0.5}
            startXOffset={48}
            endXOffset={-40}
          />
        </>
      )}
    </div>
  );
}
