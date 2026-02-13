import type { UserWithRole } from "@/actions/session.actions"

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
   isOpenToRecruiters?: boolean
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
           isOpenToRecruiters?: boolean
        }
     }
   | {
        success: false
        message: string
     }
