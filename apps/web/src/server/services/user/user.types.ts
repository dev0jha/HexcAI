import type { UserWithRole } from "@/actions/session.actions"
import { RequestContext } from "@/server/services/types/context.types"

export type GetUserResponse =
   | {
        success: true
        user: UserWithRole & {
           company?: string
           position?: string
           isVerified?: boolean
           username?: string
           bio?: string
           location?: string
           isOpenToRecruiters?: boolean
           score?: number
           techStack?: string[]
           profileViews?: number
           searchAppearances?: number
        }
     }
   | {
        success: false
        message: string
     }

export type UpdateUserBody = {
   name?: string
   company?: string
   position?: string
   bio?: string
   location?: string
   website?: string
   isOpenToRecruiters?: boolean
   isPublicProfile?: boolean
}

export interface UpdateUserRequestCtx extends RequestContext {
   body: UpdateUserBody
}

export type GetUserSettingsResponse =
   | {
        success: true
        settings: {
           name: string
           email: string
           image?: string
           role: "recruiter" | "candidate"
           username?: string
           company?: string
           position?: string
           bio?: string
           location?: string
           website?: string
           isOpenToRecruiters?: boolean
           isPublicProfile?: boolean
        }
     }
   | {
        success: false
        message: string
     }

export type UpdateUserResponse =
   | {
        success: true
        user: {
           id: string
           name: string
           company?: string
           position?: string
           bio?: string
           location?: string
           website?: string
           isOpenToRecruiters?: boolean
        }
     }
   | {
        success: false
        message: string
     }

export type UploadProfileImageResponse =
   | {
        success: true
        imageUrl: string
     }
   | {
        success: false
        message: string
     }
