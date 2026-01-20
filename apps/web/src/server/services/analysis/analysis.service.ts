import { generateText, tool } from "ai"
import { groq } from "@ai-sdk/groq"
import { sse } from "elysia"
import { z } from "zod"

import { attempt, attemptSync, err, ok } from "@/utils/attempt"
import { githubRepoSchema } from "@/utils/validation/github.validation"
import { buildPrompt } from "@/server/prompt/prompt.builder"
import { analysisResponse } from "./analysis.validation"

import type { PromiseRes, Result } from "@/utils/attempt"
import type { RepoFetchResult } from "./analysis.types"
import type { AnalysisResponse } from "./analysis.validation.ts"
import { Context } from "elysia"

export class AnalysisService {
  /*
   * Fetch GitHub repository data using GitHub API
   * **/
  public static async fetchGitHubRepo(owner: string, repo: string): PromiseRes<RepoFetchResult> {
    const responseAttempt = await attempt(() =>
      fetch(`https://api.github.com/repos/${owner}/${repo}`)
    )

    if (!responseAttempt.ok) {
      return err(new Error("Network error while reaching GitHub"))
    }

    const res = responseAttempt.data

    switch (res.status) {
      case 200:
        return ok(await res.json())

      case 301:
      case 302:
        return err(new Error("Repository was moved (redirect). Use the canonical GitHub URL."))

      case 400:
        return err(new Error("Bad request to GitHub. Check the owner/repo format."))

      case 401:
        return err(new Error("Unauthorized GitHub request. Server token may be invalid."))

      case 403: {
        const rateLimit = res.headers.get("x-ratelimit-remaining")

        if (rateLimit === "0") {
          const reset = res.headers.get("x-ratelimit-reset")
          const resetAt = reset ? new Date(Number(reset) * 1000).toLocaleTimeString() : "soon"

          return err(new Error(`GitHub rate limit exceeded. Try again after ${resetAt}.`))
        }

        return err(new Error("Access forbidden. Repo may be private."))
      }

      case 404:
        return err(new Error("Repo not found. Make sure it exists and is public."))

      case 451:
        return err(new Error("Repository unavailable for legal reasons."))

      case 500:
      case 502:
      case 503:
      case 504:
        return err(new Error("GitHub is having server issues. Try again later."))

      default:
        return err(new Error(`GitHub error: HTTP ${res.status}`))
    }
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
   * Perform analysis using AI model
   * with tools for fetching additional repository information
   * **/
  public static async analyze(
    owner: string,
    repo: string,
    repoData: any
  ): PromiseRes<AnalysisResponse, Error> {
    const prompt = buildPrompt(repoData)

    const resultAttempt = await attempt(() =>
      generateText({
        model: groq("moonshotai/kimi-k2-instruct-0905"),
        prompt: `${prompt}\n\nReturn only a valid JSON object matching the required schema. Do not include any additional text, explanations, or formatting.`,
        tools: {
          fetchReadme: tool({
            description: "Fetch the README content from the repository",
            inputSchema: z.object({}),
            execute: async () => {
              const res = await this.fetchREADME(owner, repo)
              return res.ok ? res.data : null
            },
          }),
          fetchLanguages: tool({
            description: "Fetch the programming languages used in the repository",
            inputSchema: z.object({}),
            execute: async () => {
              const res = await this.fetchLanguages(owner, repo)
              return res.ok ? res.data : {}
            },
          }),
        },
      })
    )

    if (!resultAttempt.ok) {
      console.error("AI generation error:", resultAttempt.error)
      return err(new Error("Failed to generate AI analysis"))
    }

    const result = resultAttempt.data

    if (!result.text || result.text.trim() === "") {
      return err(new Error("AI returned empty response"))
    }

    const jsonMatch = result.text.match(/\{[\s\S]*\}/)
    let jsonText = jsonMatch ? jsonMatch[0] : result.text

    const lastBraceIndex = jsonText.lastIndexOf("}")
    if (lastBraceIndex !== -1) {
      jsonText = jsonText.substring(0, lastBraceIndex + 1)
    }

    const analysis = attemptSync(() => JSON.parse(jsonText))
    if (!analysis.ok) {
      console.error("[PARSE ERROR]:", analysis.error)
      console.error("Raw response:", result.text)
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
  public static async *analyzeRepository({
    body,
    headers,
  }: { body: { repoUrl: string } } & Context) {
    headers["content-type"] = "text/event-stream"

    yield sse({ data: JSON.stringify({ status: "Starting analysis..." }) })

    const urlMatch = body.repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/)
    if (!urlMatch) {
      yield sse({ data: JSON.stringify({ error: "Invalid GitHub URL format" }) })
      return
    }

    const [, owner, repoRaw] = urlMatch
    const repo = repoRaw.replace(/\.git$/, "")

    const validationRes = githubRepoSchema.safeParse({ owner, repo })
    if (!validationRes.success) {
      yield sse({ data: JSON.stringify({ error: validationRes.error.issues[0].message }) })
      return
    }

    yield sse({ data: JSON.stringify({ status: "Fetching repository data..." }) })

    const repoData = await AnalysisService.fetchGitHubRepo(owner, repo)
    if (!repoData.ok) {
      yield sse({ data: JSON.stringify({ error: repoData.error.message }) })
      return
    }

    yield sse({ data: JSON.stringify({ status: "Analyzing with AI..." }) })

    const analysisRes = await AnalysisService.analyze(owner, repo, repoData.data)
    if (!analysisRes.ok) {
      yield sse({ data: JSON.stringify({ error: analysisRes.error.message }) })
      return
    }

    const analysis = analysisRes.data

    const result = {
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
    }

    yield sse({ data: JSON.stringify({ result }) })
  }
}
