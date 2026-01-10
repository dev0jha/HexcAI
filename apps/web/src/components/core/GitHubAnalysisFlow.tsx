"use client"

import { useRef } from "react"
import { Cpu, Github, TrendingUp } from "lucide-react"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { useIsMobile } from "@/hooks/use-mobile"

export function GitHubAnalysisFlow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const githubRef = useRef<HTMLDivElement>(null)
  const aiRef = useRef<HTMLDivElement>(null)
  const scoreRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  return (
    <div
      ref={containerRef}
      className="relative glass-card rounded-3xl p-4 md:p-8 min-h-50 md:min-h-100 flex flex-col justify-center w-full"
    >
      <div className="flex flex-row items-center justify-between gap-3 md:gap-4">
        {/* GitHub Input */}
        <div className="flex flex-col items-center gap-1.5 md:gap-3">
          <div
            ref={githubRef}
            className="z-10 flex h-12 w-12 md:h-20 md:w-20 items-center justify-center rounded-lg md:rounded-2xl border-2 border-border bg-surface-2 p-2 md:p-4 shadow-lg hover:border-primary/50 transition-all duration-300 hover:shadow-glow-sm"
          >
            <Github className="h-6 w-6 md:h-10 md:w-10 text-foreground" />
          </div>
          <span className="text-[10px] md:text-sm font-medium text-muted-foreground text-center">
            Connect GitHub
          </span>
        </div>

        {/* AI Processing */}
        <div className="flex flex-col items-center gap-1.5 md:gap-3">
          <div
            ref={aiRef}
            className="z-10 flex h-14 w-14 md:h-24 md:w-24 items-center justify-center rounded-lg md:rounded-2xl border-2 border-primary/50 bg-primary/10 p-2 md:p-4 shadow-glow"
          >
            <Cpu className="h-7 w-7 md:h-12 md:w-12 text-primary animate-pulse" />
          </div>
          <span className="text-[10px] md:text-sm font-medium text-primary text-center">
            AI Analysis
          </span>
        </div>

        {/* Score Output */}
        <div className="flex flex-col items-center gap-1.5 md:gap-3">
          <div
            ref={scoreRef}
            className="z-10 flex h-12 w-12 md:h-20 md:w-20 items-center justify-center rounded-lg md:rounded-2xl border-2 border-border bg-surface-2 p-2 md:p-4 shadow-lg hover:border-success/50 transition-all duration-300"
          >
            <TrendingUp className="h-6 w-6 md:h-10 md:w-10 text-success" />
          </div>
          <span className="text-[10px] md:text-sm font-medium text-muted-foreground text-center">
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
  )
}
