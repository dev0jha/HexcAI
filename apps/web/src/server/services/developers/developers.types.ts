import { Developer } from "@/types"

export type { DevelopersQuery, Developer, DevelopersResponse } from "@/lib/queries/query.types"

export interface TechStackResponse {
   techStacks: string[]
}

export interface DeveloperByUsernameResponse {
   developer: Developer
}

export type GetDevelopersResponse = import("@/lib/queries/query.types").DevelopersResponse
export type GetTechStacksResponse = TechStackResponse
export type GetDeveloperByUsernameResponse = DeveloperByUsernameResponse
