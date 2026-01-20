import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

import { attempt, attemptSync, err, ok } from "@/utils/attempt"
import { githubRepoSchema } from "@/utils/validation/github.validation"
import { buildPrompt } from "@/server/prompt/prompt.builder"
import { analysisResponse } from "./analysis.validation"

import type { AnalyzedRepo } from "@/types"
import type { PromiseRes, Result } from "@/utils/attempt"
import type { RepoFetchResult } from "./analysis.types"
import type { AnalysisResponse } from "./analysis.validation.ts"

export class AnalysisService {
  /*
   * Internal function
   * Fetch GitHub repository data using GitHub API
   * **/
  private static async fetchGitHubRepo(owner: string, repo: string): PromiseRes<RepoFetchResult> {
    const response = await attempt(() => fetch(`https://api.github.com/repos/${owner}/${repo}`))
    if (!response.ok) {
      return err(new Error("Failed to fetch GitHub repo"))
    }

    const data = await response.data.json()
    return ok(data)
  }

  /*
   *
   *  fetch README file from GitHub repository
   * */
  private static async fetchREADME(owner: string, repo: string): PromiseRes<string | null> {
    const response = await attempt(() =>
      fetch(`https://api.github.com/repos/${owner}/${repo}/readme`)
    )
    if (!response.ok) {
      console.error("Failed to fetch README:", response.error)
      return err(new Error("Failed to fetch README"))
    }

    const data = await response.data.json()

    const content = this.parseAIResponse(data)
    if (!content.ok) {
      return err(content.error)
    }

    return ok(content.data)
  }

  private static parseAIResponse(data: any): Result<string, Error> {
    const content = attemptSync(() => Buffer.from(data.content, "base64").toString("utf-8"))
    if (!content.ok) {
      return err(new Error("Failed to decode README content"))
    }
    return ok(content.data)
  }

  /*
   *
   * fetch programming languages used in the repository
   * **/
  private static async fetchLanguages(
    owner: string,
    repo: string
  ): PromiseRes<Record<string, number>> {
    const response = await attempt(() =>
      fetch(`https://api.github.com/repos/${owner}/${repo}/languages`)
    )
    if (!response.ok) {
      console.error("Failed to fetch languages:", response.error)
      return err(new Error("Failed to fetch languages"))
    }

    const data = await response.data.json()
    return ok(data)
  }

  /*
   *
   *
   * Perform analysis using Gemini model
   * with information from the repository
   * **/
  private static async analyze(
    repoData: any,
    readme: string | null,
    languages: any
  ): PromiseRes<AnalysisResponse, Error> {
    const prompt = buildPrompt(repoData, readme, languages)

    const result = await generateText({
      model: groq("openai/gpt-oss-20b"),
      prompt,
    })

    const analysis = attemptSync(() => JSON.parse(result.text))
    if (!analysis.ok) {
      console.error("[PARSE ERROR]:", analysis.error)
      return err(new Error("Failed to parse analysis result"))
    }

    const formatValidation = analysisResponse.safeParse(analysis.data)
    if (!formatValidation.success) {
      return err(new Error(formatValidation.error.issues[0].message))
    }

    return ok(formatValidation.data)
  }

  /*
   *
   *Main function to analyze a GitHub repository given its URL
   * **/
  static async analyzeRepository(repoUrl: string): PromiseRes<AnalyzedRepo> {
    const urlMatch = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/)
    if (!urlMatch) {
      return err(new Error("Invalid GitHub URL format"))
    }

    const [, owner, repoRaw] = urlMatch

    const repo = repoRaw.replace(/\.git$/, "")

    const validationRes = githubRepoSchema.safeParse({ owner, repo })
    if (!validationRes.success) {
      return err(new Error(validationRes.error.issues[0].message))
    }

    const [repoData, readme, languages] = await Promise.all([
      this.fetchGitHubRepo(owner, repo),
      this.fetchREADME(owner, repo),
      this.fetchLanguages(owner, repo),
    ])

    switch (true) {
      case !repoData.ok:
        console.error("Failed to fetch github repo", repoData.error)
        return err(repoData.error)

      case !readme.ok:
        console.error("error getting readme:", readme.error)
        return err(readme.error)

      case !languages.ok:
        console.error("error while getting languages", languages.error)
        return err(languages.error)
    }

    const analysisRes = await this.analyze(repoData.data, readme.data, languages.data)
    if (!analysisRes.ok) {
      return err(analysisRes.error)
    }

    const analysis = analysisRes.data

    return ok({
      id: `ar-${Date.now()}`,
      name: repoData.data.name,
      url: repoData.data.html_url,
      description: repoData.data.description,
      language: repoData.data.language ?? "Unknown",
      stars: repoData.data.stargazers_count ?? 0,
      analyzedAt: new Date(),
      scores: analysis.scores,
      totalScore: analysis.totalScore,
      feedback: analysis.feedback,
    })
  }
}
