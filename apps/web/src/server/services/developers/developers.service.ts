import { desc, asc, eq, like, or, count, and } from "drizzle-orm"

import { db } from "@/db/drizzle"
import { user, candidateProfiles } from "@/db/schema"
import { attempt } from "@/utils/attempt"
import type { ActionRes, ActionResAsync } from "@/types/actions"

import type { DevelopersQuery, DevelopersResponse, Developer } from "@/lib/queries/query.types"
import type { DeveloperByUsernameResponse, TechStackResponse } from "./developers.types"

export abstract class DevelopersService {
   static async getDevelopers({
      query,
   }: {
      query: DevelopersQuery
   }): Promise<ActionRes<DevelopersResponse>> {
      const page = Math.max(1, query.page || 1)
      const limit = Math.min(100, Math.max(1, query.limit || 50))
      const offset = (page - 1) * limit

      const searchConditions = query.search
         ? [
              or(
                 like(user.name, `%${query.search}%`),
                 like(candidateProfiles.techStack, `%${query.search}%`)
              ),
           ]
         : []

      const techConditions =
         query.tech && query.tech !== "All"
            ? [like(candidateProfiles.techStack, `%${query.tech}%`)]
            : []

      const whereConditions = [
         eq(user.role, "candidate"),
         eq(candidateProfiles.isVisible, true),
         ...searchConditions,
         ...techConditions,
      ]

      const countResult = await attempt(() =>
         db
            .select({ count: count() })
            .from(user)
            .innerJoin(candidateProfiles, eq(user.id, candidateProfiles.userId))
            .where(whereConditions.length ? and(...whereConditions) : undefined)
      )

      if (!countResult.ok) {
         return {
            success: false,
            error: `Failed to count developers: ${countResult.error.message}`,
         }
      }

      const total = countResult.data[0]?.count ?? 0

      let sortCondition
      switch (query.sort) {
         case "score-asc":
            sortCondition = asc(candidateProfiles.score)
            break
         case "name-asc":
            sortCondition = asc(user.name)
            break
         case "score-desc":
         default:
            sortCondition = desc(candidateProfiles.score)
            break
      }

      const developersResult = await attempt(() =>
         db
            .select({
               id: user.id,
               name: user.name,
               email: user.email,
               avatar: user.image,
               username: candidateProfiles.githubUsername,
               bio: candidateProfiles.bio,
               location: candidateProfiles.location,
               techStack: candidateProfiles.techStack,
               score: candidateProfiles.score,
               isVisible: candidateProfiles.isVisible,
               createdAt: user.createdAt,
            })
            .from(user)
            .innerJoin(candidateProfiles, eq(user.id, candidateProfiles.userId))
            .where(whereConditions.length ? and(...whereConditions) : undefined)
            .orderBy(sortCondition)
            .limit(limit)
            .offset(offset)
      )

      if (!developersResult.ok) {
         return {
            success: false,
            error: `Failed to fetch developers: ${developersResult.error.message}`,
         }
      }

      const developers: Developer[] = developersResult.data.map(dev => ({
         id: dev.id,
         name: dev.name,
         email: dev.email,
         avatar: dev.avatar ?? undefined,
         username: dev.username,
         bio: dev.bio ?? undefined,
         location: dev.location ?? undefined,
         linkedIn: undefined,
         website: undefined,
         techStack: Array.isArray(dev.techStack) ? dev.techStack : [],
         score: dev.score,
         isVisible: dev.isVisible,
         createdAt: dev.createdAt,
         role: "developer" as const,
         isOpenToRecruiters: dev.isVisible,
         analyzedRepos: [],
      }))

      const totalPages = Math.ceil(total / limit)

      const response: DevelopersResponse = {
         developers,
         meta: {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
         },
      }

      return {
         success: true,
         data: response,
      }
   }

   static async getTechStacks(): ActionResAsync<TechStackResponse> {
      const techStacksResult = await attempt(() =>
         db
            .select({ techStack: candidateProfiles.techStack })
            .from(candidateProfiles)
            .where(eq(candidateProfiles.isVisible, true))
      )

      if (!techStacksResult.ok) {
         return {
            success: false,
            error: `Failed to fetch tech stacks: ${techStacksResult.error.message}`,
         }
      }

      const allTechStacks = techStacksResult.data
         .flatMap(item => (Array.isArray(item.techStack) ? item.techStack : []))
         .filter((tech): tech is string => Boolean(tech) && typeof tech === "string")

      const uniqueTechStacks = Array.from(new Set(allTechStacks)).sort()

      const response: TechStackResponse = {
         techStacks: uniqueTechStacks,
      }

      return {
         success: true,
         data: response,
      }
   }

   static async getDeveloperByUsername({
      params,
   }: {
      params: { username: string }
   }): ActionResAsync<DeveloperByUsernameResponse> {
      const developerResult = await attempt(() =>
         db
            .select({
               id: user.id,
               name: user.name,
               email: user.email,
               avatar: user.image,
               role: user.role,
               username: candidateProfiles.githubUsername,
               bio: candidateProfiles.bio,
               location: candidateProfiles.location,
               techStack: candidateProfiles.techStack,
               score: candidateProfiles.score,
               isVisible: candidateProfiles.isVisible,
               createdAt: user.createdAt,
            })
            .from(user)
            .innerJoin(candidateProfiles, eq(user.id, candidateProfiles.userId))
            .where(
               and(
                  eq(user.role, "candidate"),
                  eq(candidateProfiles.githubUsername, params.username),
                  eq(candidateProfiles.isVisible, true)
               )
            )
            .limit(1)
      )

      if (!developerResult.ok) {
         return {
            success: false,
            error: `Failed to fetch developer: ${developerResult.error.message}`,
         }
      }

      const developer = developerResult.data[0]
      if (!developer) {
         return {
            success: true,
            data: { developer: null },
         }
      }

      const developerData: any = {
         ...developer,
         bio: developer.bio || undefined,
         location: developer.location || undefined,
         techStack: Array.isArray(developer.techStack) ? developer.techStack : [],
         linkedIn: undefined,
         website: undefined,
         isOpenToRecruiters: true,
         analyzedRepos: [],
      }

      return {
         success: true,
         data: {
            developer: developerData,
         },
      }
   }
}
