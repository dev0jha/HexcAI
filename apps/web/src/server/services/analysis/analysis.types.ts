export interface RepoFetchResult {
   name: string
   description?: string
   html_url: string
   language?: string
   stargazers_count: number
   forks_count?: number
   open_issues_count?: number
}

import type { Context } from "elysia"
import type { RequestContext } from "@/server/services/types/context.types"

export interface AnalyzeRepositoryContext extends RequestContext {
   headers: Context["headers"]
}
