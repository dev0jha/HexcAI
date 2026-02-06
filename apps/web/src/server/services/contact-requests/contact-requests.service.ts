import { eq, and, desc, count } from "drizzle-orm"
import { db } from "@/db/drizzle"
import { contactRequests, recruitersProfiles, user } from "@/db/schema"
import { attempt } from "@/utils/attempt"

import type {
   GetContactReqCtx,
   UpdateContactReqCtx,
   CreateContactReqCtx,
} from "./contact-requests.types"

export class ContactRequestService {
   /*
    * Get paginated contact requests for a candidate with optional status filtering
    * **/
   static async getContactRequests({ set, query, user: authContextUser }: GetContactReqCtx) {
      const userId = authContextUser.id

      const page = Math.max(1, query.page || 1)
      const limit = Math.min(50, Math.max(1, query.limit || 10))
      const offset = (page - 1) * limit

      // Build where conditions
      const whereConditions = [eq(contactRequests.candidateId, userId)]

      if (query.status) {
         whereConditions.push(eq(contactRequests.status, query.status))
      }

      const totalCountPromise = db
         .select({ count: count() })
         .from(contactRequests)
         .where(and(...whereConditions))

      const requestsDataPromise = db
         .select({
            id: contactRequests.id,
            recruiterId: contactRequests.recruiterId,
            candidateId: contactRequests.candidateId,
            message: contactRequests.message,
            status: contactRequests.status,
            createdAt: contactRequests.createdAt,
            recruiterName: user.name,
            recruiterCompany: recruitersProfiles.companyName,
            recruiterEmail: user.email,
         })
         .from(contactRequests)
         .leftJoin(user, eq(contactRequests.recruiterId, user.id))
         .leftJoin(recruitersProfiles, eq(contactRequests.recruiterId, recruitersProfiles.userId))
         .where(and(...whereConditions))
         .orderBy(desc(contactRequests.createdAt))
         .limit(limit)
         .offset(offset)

      const queryRes = await attempt(() => Promise.all([totalCountPromise, requestsDataPromise]))
      if (!queryRes.ok) {
         console.error("Error fetching contact requests:", queryRes.error)
         set.status = 500
         return {
            success: false,
            message: "Failed to fetch contact requests",
         }
      }

      const [[{ count: total }], data] = queryRes.data

      const totalPages = Math.ceil(total / limit)

      return {
         success: true,
         contactRequests: data,
         meta: {
            page,
            limit,
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1,
         },
      }
   }

   /*
    * Create a new contact request from recruiter to candidate
    * */
   static async createContactRequest({ body, user, set }: CreateContactReqCtx) {
      const recruiterId = user.id
      const { candidateId, message } = body

      const existingRequestRes = await attempt(() =>
         db
            .select()
            .from(contactRequests)
            .where(
               and(
                  eq(contactRequests.recruiterId, recruiterId),
                  eq(contactRequests.candidateId, candidateId),
                  eq(contactRequests.status, "pending")
               )
            )
            .limit(1)
      )

      if (!existingRequestRes.ok) {
         console.error("Failed to check existing request:", existingRequestRes.error)
         set.status = 500
         return {
            success: false,
            error: "Failed to check existing contact requests",
         }
      }

      if (existingRequestRes.data.length > 0) {
         set.status = 400
         return {
            success: false,
            errror: "A pending contact request already exists for this candidate",
         }
      }

      const createRes = await attempt(() =>
         db
            .insert(contactRequests)
            .values({
               id: crypto.randomUUID(),
               recruiterId,
               candidateId,
               message,
               status: "pending",
            })
            .returning()
      )

      if (!createRes.ok) {
         console.error("Failed to create contact request:", createRes.error)
         set.status = 500
         return {
            scuccess: false,
            errror: "Failed to create contact request",
         }
      }

      const createdRequest = createRes.data[0]

      return {
         success: true,
         createdRequest,
      }
   }

   /*
    * Update the status of a contact request (accept/reject)
    * */
   static async updateContactRequestStatus({
      set,
      user: authContextUser,
      body: { status },
      params: { requestId },
   }: UpdateContactReqCtx) {
      const userId = authContextUser.id

      const reqCheckRes = await attempt(() =>
         db
            .select()
            .from(contactRequests)
            .where(and(eq(contactRequests.id, requestId), eq(contactRequests.candidateId, userId)))
            .limit(1)
      )

      if (!reqCheckRes.ok) {
         set.status = 404
         return {
            success: false,
            message: "Contact request not found",
         }
      }

      const updateRes = await attempt(() =>
         db.update(contactRequests).set({ status }).where(eq(contactRequests.id, requestId))
      )
      if (!updateRes.ok) {
         console.error("Failed to update contact request:", updateRes.error)
         set.status = 500
         return {
            success: false,
            message: "Failed to update contact request",
         }
      }

      const updatedRecordsRes = await attempt(() =>
         db
            .select({
               id: contactRequests.id,
               recruiterId: contactRequests.recruiterId,
               candidateId: contactRequests.candidateId,
               message: contactRequests.message,
               status: contactRequests.status,
               createdAt: contactRequests.createdAt,
               recruiterName: user.name,
               recruiterCompany: recruitersProfiles.companyName,
               recruiterEmail: user.email,
            })
            .from(contactRequests)
            .leftJoin(user, eq(contactRequests.recruiterId, user.id))
            .leftJoin(
               recruitersProfiles,
               eq(contactRequests.recruiterId, recruitersProfiles.userId)
            )
            .where(eq(contactRequests.id, requestId))
            .limit(1)
      )

      if (!updatedRecordsRes.ok) {
         console.error("Error updating user:", updatedRecordsRes.error)
         set.status = 500
         return {
            success: false,
            message: "Failed to update contact request",
         }
      }

      const updated = updatedRecordsRes.data

      return {
         success: true,
         updatedRequest: updated[0],
      }
   }
}
