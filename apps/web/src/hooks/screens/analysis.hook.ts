import { useState } from "react"
import { mockAnalysisResult } from "@/data/mock-data"
import { apiClient } from "@/lib/eden"

import type React from "react"
import type { AnalyzedRepo } from "@/types"

export function useAnalysis() {
  const [repoUrl, setRepoUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalyzedRepo | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault()
    if (!repoUrl) return

    setIsAnalyzing(true)
    setAnalysisComplete(false)
    setError(null)

    const response = await apiClient.analyze.post({ repoUrl })
    if (response.error) {
      console.error("API Error:", response.error)
      setError(response.error.value.message ?? "An unknown error occurred.")
      setIsAnalyzing(false)
      setAnalysisComplete(true)
      return
    }

    const analysisResult = response.data
    if (!analysisResult.ok) {
      setError(analysisResult.error.message)
      setIsAnalyzing(false)
      setAnalysisComplete(true)
      return
    }

    setAnalysisResult(analysisResult.data)
    setIsAnalyzing(false)
    setAnalysisComplete(true)
  }

  const scores = analysisResult?.scores ?? mockAnalysisResult.scores
  const scoreValues = [
    scores.codeQuality,
    scores.architecture,
    scores.security,
    scores.gitPractices,
    scores.documentation,
  ]

  return {
    isAnalyzing,
    setRepoUrl,
    analysisComplete,
    error,
    handleAnalyze,
    repoUrl,
    scoreValues,
    analysisResult,
  }
}
