import { headers } from "next/headers"
import { eq } from "drizzle-orm"

import type { Context } from "elysia/context"

import { auth } from "@/lib/auth"
import { db } from "@/db/drizzle"
import { user } from "@/db/schema/auth.schema"
import { recruitersProfiles } from "@/db/schema/recruiterProfile.schema"
import { candidateProfiles } from "@/db/schema/candidateProfile.schema"
import type {
   GetUserResponse,
   UpdateUserResponse,
   UpdateUserBody,
} from "@/server/services/user/user.types"
import { attempt } from "@/utils/attempt"

export abstract class UserService {
   static async getUser({ set }: Context): Promise<GetUserResponse> {
      const nextHeaders = await headers()

      const sessionRes = await attempt(() =>
         auth.api.getSession({
            headers: nextHeaders,
         })
      )

      if (!sessionRes.ok) {
         set.status = 401
         console.error("Error fetching session:", sessionRes.error)
         return {
            success: false,
            message: "Failed to fetch user session",
         }
      }

      const sessionUser = sessionRes.data?.user
      if (!sessionUser) {
         set.status = 401
         return {
            success: false,
            message: "Unauthorized",
         }
      }

      const userProfile = await this.getUserProfile(
         sessionUser.id,
         sessionUser.role as "recruiter" | "candidate"
      )

      set.status = 200
      return {
         success: true,
         user: {
            ...sessionUser,
            ...userProfile,
         },
      }
   }

   static async updateUser({
      body,
      user: sessionUser,
      set,
   }: Context<{ body: UpdateUserBody }> & {
      user: { id: string; role: string }
   }): Promise<UpdateUserResponse> {
      if (!sessionUser) {
         set.status = 401
         return {
            success: false,
            message: "Unauthorized",
         }
      }

      const { name, company, position, bio, location, isOpenToRecruiters } = body

      const userUpdateRes = await attempt(() =>
         db
            .update(user)
            .set({ name, updatedAt: new Date() })
            .where(eq(user.id, sessionUser.id))
            .returning()
      )

      if (!userUpdateRes.ok) {
         set.status = 500
         return {
            success: false,
            message: "Failed to update user",
         }
      }

      const role = sessionUser.role as "recruiter" | "candidate"

      if (role === "recruiter" && company !== undefined) {
         const recruiterUpdateRes = await attempt(() =>
            db
               .update(recruitersProfiles)
               .set({ companyName: company })
               .where(eq(recruitersProfiles.userId, sessionUser.id))
         )

         if (!recruiterUpdateRes.ok) {
            set.status = 500
            return {
               success: false,
               message: "Failed to update recruiter profile",
            }
         }
      }

      if (role === "candidate") {
         const candidateUpdateData: Record<string, unknown> = {}
         if (bio !== undefined) candidateUpdateData.bio = bio
         if (location !== undefined) candidateUpdateData.location = location
         if (isOpenToRecruiters !== undefined) candidateUpdateData.isVisible = isOpenToRecruiters

         if (Object.keys(candidateUpdateData).length > 0) {
            const candidateUpdateRes = await attempt(() =>
               db
                  .update(candidateProfiles)
                  .set(candidateUpdateData)
                  .where(eq(candidateProfiles.userId, sessionUser.id))
            )

            if (!candidateUpdateRes.ok) {
               set.status = 500
               return {
                  success: false,
                  message: "Failed to update candidate profile",
               }
            }
         }
      }

      const updatedProfile = await this.getUserProfile(sessionUser.id, role)

      set.status = 200
      return {
         success: true,
         user: {
            id: sessionUser.id,
            name: name ?? userUpdateRes.data[0]?.name ?? "",
            ...updatedProfile,
         },
      }
   }

   private static async getUserProfile(userId: string, role: "recruiter" | "candidate") {
      if (role === "recruiter") {
         const profileRes = await attempt(() =>
            db
               .select()
               .from(recruitersProfiles)
               .where(eq(recruitersProfiles.userId, userId))
               .limit(1)
         )

         if (profileRes.ok && profileRes.data.length > 0) {
            return {
               company: profileRes.data[0].companyName,
               isVerified: profileRes.data[0].isVerified,
            }
         }
      }

      if (role === "candidate") {
         const profileRes = await attempt(() =>
            db.select().from(candidateProfiles).where(eq(candidateProfiles.userId, userId)).limit(1)
         )

         if (profileRes.ok && profileRes.data.length > 0) {
            return {
               username: profileRes.data[0].githubUsername,
               bio: profileRes.data[0].bio ?? undefined,
               location: profileRes.data[0].location ?? undefined,
               isOpenToRecruiters: profileRes.data[0].isVisible,
               score: profileRes.data[0].score,
               techStack: profileRes.data[0].techStack as string[],
            }
         }
      }

      return {}
   }
}
