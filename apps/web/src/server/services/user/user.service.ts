import { eq } from "drizzle-orm"

import { db } from "@/db/drizzle"
import { user } from "@/db/schema/auth.schema"
import { recruitersProfiles } from "@/db/schema/recruiterProfile.schema"
import { candidateProfiles } from "@/db/schema/candidateProfile.schema"
import type {
   GetUserResponse,
   GetUserSettingsResponse,
   UpdateUserResponse,
   UpdateUserRequestCtx,
   UploadProfileImageResponse,
} from "@/server/services/user/user.types"
import { attempt } from "@/utils/attempt"
import type { RequestContext } from "@/server/services/types/context.types"
import { UserRole } from "@/db/schema/enums"
import { staticAssetStorage } from "@/infra/storage/s3client"

export abstract class UserService {
   static async getUser({ set, user: ctxUser }: RequestContext): Promise<GetUserResponse> {
      const userProfile = await UserService.getUserProfile(ctxUser.id, ctxUser.role)
      set.status = 200
      return {
         success: true,
         user: {
            ...ctxUser,
            ...userProfile,
         },
      }
   }

   static async getUserSettings({
      set,
      user: ctxUser,
   }: RequestContext): Promise<GetUserSettingsResponse> {
      const role = ctxUser.role

      const profile = await UserService.getUserProfile(ctxUser.id, role)

      set.status = 200
      return {
         success: true,
         settings: {
            name: ctxUser.name,
            email: ctxUser.email,
            image: ctxUser.image ?? undefined,
            role: ctxUser.role,
            username: profile.username,
            company: profile.company,
            position: profile.position,
            bio: profile.bio,
            location: profile.location,
            website: profile.website,
            isOpenToRecruiters: profile.isOpenToRecruiters,
            isPublicProfile: profile.isPublicProfile,
         },
      }
   }

   static async updateUser({
      body,
      user: sessionUser,
      set,
   }: UpdateUserRequestCtx): Promise<UpdateUserResponse> {
      const {
         name,
         company,
         position,
         bio,
         location,
         website,
         isOpenToRecruiters,
         isPublicProfile,
      } = body

      const userUpdateData: Record<string, unknown> = {
         updatedAt: new Date(),
      }
      if (name !== undefined) userUpdateData.name = name

      const userUpdateRes = await attempt(() =>
         db.update(user).set(userUpdateData).where(eq(user.id, sessionUser.id)).returning()
      )

      if (!userUpdateRes.ok) {
         set.status = 500
         return {
            success: false,
            message: "Failed to update user",
         }
      }

      const role = sessionUser.role as "recruiter" | "candidate"

      if (role === "recruiter") {
         const recruiterUpdateData: Record<string, unknown> = {}
         if (company !== undefined) recruiterUpdateData.companyName = company
         if (position !== undefined) recruiterUpdateData.position = position
         if (isPublicProfile !== undefined) recruiterUpdateData.isPublicProfile = isPublicProfile

         if (Object.keys(recruiterUpdateData).length > 0) {
            const existingProfile = await attempt(() =>
               db
                  .select()
                  .from(recruitersProfiles)
                  .where(eq(recruitersProfiles.userId, sessionUser.id))
                  .limit(1)
            )

            let recruiterUpdateRes
            if (existingProfile.ok && existingProfile.data.length === 0) {
               recruiterUpdateRes = await attempt(() =>
                  db.insert(recruitersProfiles).values({
                     userId: sessionUser.id,
                     companyName: (company as string) || "Unknown Company",
                     position: position,
                     isPublicProfile: isPublicProfile,
                  })
               )
            } else {
               recruiterUpdateRes = await attempt(() =>
                  db
                     .update(recruitersProfiles)
                     .set(recruiterUpdateData)
                     .where(eq(recruitersProfiles.userId, sessionUser.id))
               )
            }

            if (!recruiterUpdateRes.ok) {
               set.status = 500
               return {
                  success: false,
                  message: "Failed to update recruiter profile",
               }
            }
         }
      }

      if (role === "candidate") {
         const candidateUpdateData: Record<string, unknown> = {}
         if (bio !== undefined) candidateUpdateData.bio = bio
         if (location !== undefined) candidateUpdateData.location = location
         if (website !== undefined) candidateUpdateData.website = website
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

      if (role === "candidate") {
         const candidateUpdateData: Record<string, unknown> = {}
         if (bio !== undefined) candidateUpdateData.bio = bio
         if (location !== undefined) candidateUpdateData.location = location
         if (isOpenToRecruiters !== undefined) candidateUpdateData.isVisible = isOpenToRecruiters
         if (isPublicProfile !== undefined) candidateUpdateData.isVisible = isPublicProfile

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

      const updatedProfile = await UserService.getUserProfile(sessionUser.id, role)

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

   static async uploadProfileImage({
      user: sessionUser,
      set,
      body,
   }: {
      user: { id: string }
      set: RequestContext["set"]
      body: { imageBuffer: ArrayBuffer; contentType: string; fileName: string }
   }): Promise<UploadProfileImageResponse> {
      const key = `${sessionUser.id}/${Date.now()}-${body.fileName}`

      const imageUploadRes = await attempt(() =>
         staticAssetStorage.uploadAsset(key, Buffer.from(body.imageBuffer), body.contentType)
      )

      if (!imageUploadRes.ok) {
         const error = imageUploadRes.error

         set.status = 500
         return {
            success: false,
            message: error instanceof Error ? error.message : "Failed to upload image",
         }
      }
      const imageUrl = imageUploadRes.data

      const updateRes = await attempt(() =>
         db
            .update(user)
            .set({
               image: imageUrl,
            })
            .where(eq(user.id, sessionUser.id))
      )

      if (!updateRes.ok) {
         set.status = 500
         return {
            success: false,
            message: "Failed to update user image",
         }
      }

      set.status = 200
      return {
         success: true,
         imageUrl,
      }
   }

   public static async getUserProfile(userId: string, role: UserRole) {
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
               position: profileRes.data[0].position ?? undefined,
               isVerified: profileRes.data[0].isVerified,
               isPublicProfile: profileRes.data[0].isPublicProfile,
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
               website: profileRes.data[0].website ?? undefined,
               isOpenToRecruiters: profileRes.data[0].isVisible,
               isPublicProfile: profileRes.data[0].isVisible,
               score: profileRes.data[0].score,
               techStack: profileRes.data[0].techStack as string[],
               profileViews: profileRes.data[0].profileViews,
               searchAppearances: profileRes.data[0].searchAppearances,
            }
         }
      }

      return {}
   }
}
