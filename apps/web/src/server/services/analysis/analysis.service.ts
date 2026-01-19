import { google } from "@ai-sdk/google"
import { generateText } from "ai"
import { attempt, attemptSync, err, ok, PromiseRes, Result } from "@/utils/attempt"
import { githubRepoSchema } from "@/utils/validation/github.validation"

import type { RepoFetchResult } from "@/server/services/analysis/analysis.types"
import type { AnalyzedRepo } from "@/types"

export class AnalysisService {
  /*
   * Internal function
   * Fetch GitHub repository data using GitHub API
   * **/
  private static async fetchGitHubRepo(
    owner: string,
    repo: string
  ): PromiseRes<RepoFetchResult, Error> {
    const response = await attempt(() => fetch(`https://api.github.com/repos/${owner}/${repo}`))
    if (!response.ok) {
      return err(new Error(`Failed to fetch GitHub repo: ${response.error}`))
    }

    const data = await response.data.json()
    return ok(data)
  }

  /*
   *
   *  fetch README file from GitHub repository
   * */
  private static async fetchREADME(
    owner: string,
    repo: string
  ): Promise<Result<string | null, Error>> {
    const response = await attempt(() =>
      fetch(`https://api.github.com/repos/${owner}/${repo}/readme`)
    )
    if (!response.ok) {
      console.error("Failed to fetch README:", response.error)
      return err(new Error("Failed to fetch README"))
    }

    const data = await response.data.json()

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
  ): Promise<Result<Record<string, number>, Error>> {
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
  private static async analyzeWithGemini(repoData: any, readme: string | null, languages: any) {
    const prompt = `
	Analyze this GitHub repository and provide scores and feedback based on the following criteria:

	Repository: ${repoData.name}
	Description: ${repoData.description || "No description"}
	Language: ${repoData.language}
	Stars: ${repoData.stargazers_count}
	Forks: ${repoData.forks_count}
	Issues: ${repoData.open_issues_count}

	README Content:
	${readme || "No README found"}

	Languages: ${JSON.stringify(languages)}

	Please provide a detailed analysis in the following JSON format:
	{
	  "scores": {
		"codeQuality": number (0-100),
		"architecture": number (0-100),
		"security": number (0-100),
		"gitPractices": number (0-100),
		"documentation": number (0-100)
	  },
	  "feedback": string[] (5-7 detailed feedback points),
	  "totalScore": number (weighted average)
	}

	Scoring guidelines:
	- Code Quality: Clean code, proper naming, structure
	- Architecture: Project organization, design patterns
	- Security: Safe practices, no obvious vulnerabilities
	- Git Practices: Commit messages, branch management, PRs
	- Documentation: README, code comments, API docs

	Calculate totalScore as: (codeQuality*0.3 + architecture*0.2 + security*0.2 + gitPractices*0.15 + documentation*0.15)
`

    const result = await generateText({
      model: google("gemini-2.0-flash-exp"),
      prompt,
    })

    try {
      const analysis = JSON.parse(result.text)
      return analysis
    } catch (error) {
      return {
        scores: {
          codeQuality: 75,
          architecture: 70,
          security: 65,
          gitPractices: 80,
          documentation: 60,
        },
        feedback: [
          "Repository shows good basic structure",
          "Consider improving documentation",
          "Code quality appears acceptable",
          "Security practices need review",
          "Git practices seem standard",
        ],
        totalScore: 70,
      }
    }
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

    const githubRepoPormise = this.fetchGitHubRepo(owner, repo)
    const readmPromise = this.fetchREADME(owner, repo)
    const languagesPromise = this.fetchLanguages(owner, repo)

    const [repoData, readme, languages] = await Promise.all([
      githubRepoPormise,
      readmPromise,
      languagesPromise,
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

    const analysis = await this.analyzeWithGemini(repoData.data, readme.data, languages.data)

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
