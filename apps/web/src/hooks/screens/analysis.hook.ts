import { useState } from "react"
import { mockAnalysisResult } from "@/data/mock-data"
import { attempt, attemptSync } from "@/utils/attempt"

import type React from "react"
import type { AnalyzedRepo } from "@/types"

export type AnalysisState =
  | { status: "idle" }
  | { status: "responding"; currentStatus: string }
  | { status: "complete"; result: AnalyzedRepo }
  | { status: "error"; error: string }

export function useAnalysis() {
  const [repoUrl, setRepoUrl] = useState("")
  const [state, setState] = useState<AnalysisState>({ status: "idle" })

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault()
    if (!repoUrl) return

    setState({
      status: "responding",
      currentStatus: "Starting analysis...",
    })

    const fetchResponse = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repoUrl }),
    })

    if (!fetchResponse.ok) {
      setState({
        status: "error",
        error: `HTTP ${fetchResponse.status}: ${fetchResponse.statusText}`,
      })
      return
    }

    const reader = fetchResponse.body?.getReader()
    if (!reader) {
      setState({ status: "error", error: "No response body" })
      return
    }

    const decoder = new TextDecoder()
    let buffer = ""
    let gotResult = false

    const streamAttempt = await attempt(async () => {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split("\n")
        buffer = lines.pop() || ""

        for (const line of lines) {
          const trimmed = line.trim()
          if (trimmed.startsWith("data: ")) {
            const data = trimmed.slice(6).trim()
            if (data) {
              const parseResult = attemptSync(() => JSON.parse(data))
              if (!parseResult.ok) {
                console.error("Failed to parse chunk:", data, parseResult.error)
                continue
              }
              const chunk = parseResult.data

              if (chunk.error) {
                throw new Error(chunk.error)
              }

              if (chunk.status) {
                setState({ status: "responding", currentStatus: chunk.status })
              }

              if (chunk.result) {
                setState({ status: "complete", result: chunk.result })
                gotResult = true
                return true
              }
            }
          }
        }
      }

      if (!gotResult) {
        throw new Error("incomplete response end")
      }
      return true
    })

    reader.releaseLock()

    if (!streamAttempt.ok) {
      setState({ status: "error", error: streamAttempt.error.message })
    }
  }

  const scores = state.status === "complete" ? state.result.scores : mockAnalysisResult.scores

  const isAnalyzing = state.status === "responding"
  const isComplete = state.status === "complete"
  const isError = state.status === "error"

  const scoreValues = [
    scores.codeQuality,
    scores.architecture,
    scores.security,
    scores.gitPractices,
    scores.documentation,
  ]

  return {
    isAnalyzing,
    isComplete,
    isError,
    state,
    repoUrl,
    setRepoUrl,
    scoreValues,
    handleAnalyze,
  }
}
