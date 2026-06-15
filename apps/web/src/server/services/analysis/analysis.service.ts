import { groq } from "@ai-sdk/groq"
import { generateText, tool, stepCountIs } from "ai"
import { sse } from "elysia"
import { z } from "zod"

import { eq, desc } from "drizzle-orm"

import { db } from "@/db/drizzle"
import { analysis as analysisTable } from "@/db/schema/analysis.schema"
import { buildPrompt } from "@/server/prompt/prompt.builder"
import { attempt, attemptSync, err, ok } from "@/utils/attempt"
import type { PromiseRes, Result } from "@/utils/attempt"
import { githubRepoSchema } from "@/utils/validation/github.validation"
import { ErrWith } from "@/lib/err"

import type { RepoFetchResult, AnalyzeRepositoryContext } from "./analysis.types"
import { analysisResponse } from "./analysis.validation"
import type { AnalysisResponse } from "./analysis.validation.ts"
import type { AnalyzedRepo } from "@/types"

function extractJsonString(text: string): string {
   const trimmed = text.trim()

   const parseRes = attemptSync(JSON.parse(trimmed))
   if (parseRes.ok) {
      return trimmed
   }

   /*
    * Try extracting from markdown code fences:
    * ```json\n...\n``` or ```\n...\n```
    * */
   const codeFenceMatch = trimmed.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/)
   if (codeFenceMatch) {
      const candidate = codeFenceMatch[1].trim()

      const parseRes = attemptSync(JSON.parse(candidate))
      if (parseRes.ok) {
         return candidate
      }
   }

   /*
    *Try extracting from markdown code fences where the backticks are on the same line as the brace
    * */
   const inlineFenceMatch = trimmed.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/)
   if (inlineFenceMatch) {
      return inlineFenceMatch[1]
   }

   /*
    * Fall back to finding first { and last }
    * */
   const braceMatch = trimmed.match(/\{[\s\S]*\}/)
   if (braceMatch) {
      return braceMatch[0]
   }

   return trimmed
}

export class AnalysisService {
   /*
    * Fetch GitHub repository data using GitHub API
    * **/
   public static async fetchGitHubRepo(owner: string, repo: string): PromiseRes<RepoFetchResult> {
      const responseAttempt = await attempt(() =>
         fetch(`https://api.github.com/repos/${owner}/${repo}`)
      )

      if (!responseAttempt.ok) {
         return err(
            ErrWith({
               message: "Network error while reaching GitHub",
            })
         )
      }

      const res = responseAttempt.data

      switch (res.status) {
         case 200:
            return ok(await res.json())
         case 301:
         case 302:
            return err(
               ErrWith({
                  message: "Repository was moved (redirect). Use the canonical GitHub URL.",
               })
            )
         case 400:
            return err(
               ErrWith({
                  message: "Bad request to GitHub. Check the owner/repo format.",
               })
            )
         case 401:
            return err(
               ErrWith({
                  message: "Unauthorized GitHub request. Server token may be invalid.",
               })
            )
         case 403: {
            const rateLimit = res.headers.get("x-ratelimit-remaining")

            if (rateLimit === "0") {
               const reset = res.headers.get("x-ratelimit-reset")
               const resetAt = reset ? new Date(Number(reset) * 1000).toLocaleTimeString() : "soon"

               return err(
                  ErrWith({
                     message: `GitHub rate limit exceeded. Try again after ${resetAt}.`,
                  })
               )
            }
            return err(
               ErrWith({
                  message: "Access forbidden. Repo may be private.",
               })
            )
         }
         case 404:
            return err(
               ErrWith({
                  message: "Repo not found. Make sure it exists and is public.",
               })
            )
         case 451:
            return err(
               ErrWith({
                  message: "Repository unavailable for legal reasons.",
               })
            )
         case 500:
         case 502:
         case 503:
         case 504:
            return err(
               ErrWith({
                  message: "GitHub is having server issues. Try again later.",
               })
            )
         default:
            return err(
               ErrWith({
                  message: `GitHub error: HTTP ${res.status}`,
               })
            )
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
         return err(
            ErrWith({
               message: "Failed to fetch README",
            })
         )
      }

      const data = await response.data.json()

      const content = this.parseAIResponse(data)
      if (!content.ok) {
         return err(content.error)
      }

      return ok(content.data)
   }

   private static parseAIResponse(data: unknown): Result<string, Error> {
      const content = attemptSync(() =>
         Buffer.from((data as { content: string }).content, "base64").toString("utf-8")
      )
      if (!content.ok) {
         return err(
            ErrWith({
               message: "Failed to decode README content",
            })
         )
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
         return err(
            ErrWith({
               message: "Failed to fetch languages",
            })
         )
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
      repoData: RepoFetchResult
   ): PromiseRes<AnalysisResponse, Error> {
      const prompt = buildPrompt(repoData)

      const resultAttempt = await attempt(() =>
         generateText({
            model: groq("openai/gpt-oss-20b"),
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
            stopWhen: stepCountIs(5),
         })
      )

      if (!resultAttempt.ok) {
         console.error("AI generation error:", resultAttempt.error)
         return err(
            ErrWith({
               message: "Failed to generate AI analysis",
            })
         )
      }

      const result = resultAttempt.data

      console.error("Raw AI response:", result.content)

      if (!result.text || result.text.trim() === "") {
         return err(
            ErrWith({
               message: "AI returned empty response",
            })
         )
      }

      const jsonText = extractJsonString(result.text)

      const analysis = attemptSync(() => JSON.parse(jsonText))
      if (!analysis.ok) {
         console.error("[PARSE ERROR]:", analysis.error)
         return err(
            ErrWith({
               message: "Failed to parse analysis result",
            })
         )
      }

      const formatValidation = analysisResponse.safeParse(analysis.data)
      if (!formatValidation.success) {
         return err(
            ErrWith({
               message: formatValidation.error.issues[0].message,
            })
         )
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
      user,
   }: AnalyzeRepositoryContext & { body: { repoUrl: string } }) {
      headers["content-type"] = "text/event-stream"

      yield sse({
         data: JSON.stringify({
            status: "Starting analysis...",
         }),
      })

      const urlMatch = body.repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/)
      if (!urlMatch) {
         yield sse({
            data: JSON.stringify({
               error: "Invalid GitHub URL format",
            }),
         })
         return
      }

      const [, owner, repoRaw] = urlMatch
      const repo = repoRaw.replace(/\.git$/, "")

      const validationRes = githubRepoSchema.safeParse({ owner, repo })
      if (!validationRes.success) {
         yield sse({
            data: JSON.stringify({
               error: validationRes.error.issues[0].message,
            }),
         })
         return
      }

      yield sse({
         data: JSON.stringify({ status: "Fetching repository data..." }),
      })

      const repoData = await AnalysisService.fetchGitHubRepo(owner, repo)
      if (!repoData.ok) {
         yield sse({
            data: JSON.stringify({
               error: repoData.error.message,
            }),
         })
         return
      }

      yield sse({
         data: JSON.stringify({
            status: "Analyzing with AI...",
         }),
      })

      const analysisRes = await AnalysisService.analyze(owner, repo, repoData.data)
      if (!analysisRes.ok) {
         yield sse({
            data: JSON.stringify({
               error: analysisRes.error.message,
            }),
         })
         return
      }

      const analysis = analysisRes.data

      const resultId = `ar-${Date.now()}`

      const result = {
         id: resultId,
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

      const insertRes = await attempt(() =>
         db.insert(analysisTable).values({
            id: resultId,
            candidateId: user.id,
            repoUrl: result.url,
            name: result.name,
            language: result.language,
            stars: result.stars,
            description: result.description ?? null,
            scoreBreakdown: result.scores,
            totalScore: result.totalScore,
            feedback: result.feedback,
            summary: analysis.feedback[0] ?? null,
            createdAt: result.analyzedAt,
         })
      )

      if (!insertRes.ok) {
         console.error("Failed to save analysis:", insertRes.error)
         yield sse({
            data: JSON.stringify({
               error: "Failed to save analysis",
            }),
         })
         return
      }

      yield sse({
         data: JSON.stringify({
            result,
         }),
      })
   }

   static async getAnalysisHistory({ user, set }: AnalyzeRepositoryContext) {
      const analysesRes = await attempt(() =>
         db
            .select()
            .from(analysisTable)
            .where(eq(analysisTable.candidateId, user.id))
            .orderBy(desc(analysisTable.createdAt))
      )

      if (!analysesRes.ok) {
         console.error("Failed to fetch analyses:", analysesRes.error)
         set.status = 500
         return {
            success: false,
            analyses: [],
         }
      }

      const analyses: AnalyzedRepo[] = analysesRes.data.map(a => ({
         id: a.id,
         name: a.name,
         url: a.repoUrl,
         description: a.description ?? undefined,
         language: a.language ?? "Unknown",
         stars: a.stars ?? 0,
         analyzedAt: a.createdAt,
         scores: a.scoreBreakdown as AnalyzedRepo["scores"],
         totalScore: a.totalScore,
         feedback: a.feedback as string[],
      }))

      set.status = 200
      return {
         success: true,
         analyses,
      }
   }

   static async getAnalysisById({
      params,
      user,
      set,
   }: AnalyzeRepositoryContext & { params: { analysisId: string } }) {
      const analysisRes = await attempt(() =>
         db.select().from(analysisTable).where(eq(analysisTable.id, params.analysisId)).limit(1)
      )

      if (!analysisRes.ok) {
         set.status = 500
         return {
            success: false,
            error: "Failed to fetch analysis",
         }
      }

      if (analysisRes.data.length === 0) {
         set.status = 404
         return {
            success: false,
            error: "Analysis not found",
         }
      }

      const a = analysisRes.data[0]

      if (a.candidateId !== user.id) {
         set.status = 403
         return {
            success: false,
            error: "Not authorized to view this analysis",
         }
      }

      const analysis: AnalyzedRepo = {
         id: a.id,
         name: a.name,
         url: a.repoUrl,
         description: a.description ?? undefined,
         language: a.language ?? "Unknown",
         stars: a.stars ?? 0,
         analyzedAt: a.createdAt,
         scores: a.scoreBreakdown as AnalyzedRepo["scores"],
         totalScore: a.totalScore,
         feedback: a.feedback as string[],
      }

      set.status = 200
      return {
         success: true,
         analysis,
      }
   }
}
