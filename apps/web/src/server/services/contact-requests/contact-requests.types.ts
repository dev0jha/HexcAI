import type { Context } from "elysia"
import type { UserWithRole } from "@/actions/session.actions"
import type { ContactStatus } from "@/db/schema"

interface RequestContext {
   user: UserWithRole
   set: Context["set"]
}

export interface GetContactReqCtx extends RequestContext {
   query: ContactRequestQuery
}

export interface UpdateContactReqCtx extends RequestContext {
   query: ContactRequestQuery
   params: {
      requestId: string
   }
   body: {
      status: ContactStatus
   }
}

export interface ContactRequestQuery {
   page?: number
   limit?: number
   status?: ContactStatus
}

export interface ContactRequestResponse {
   data: Array<{
      id: string
      recruiterId: string
      candidateId: string
      message: string | null
      status: ContactStatus
      createdAt: Date
      recruiterName: string | null
      recruiterCompany: string | null
      recruiterEmail: string | null
   }>
   meta: {
      page: number
      limit: number
      total: number
      totalPages: number
      hasNext: boolean
      hasPrev: boolean
   }
}
