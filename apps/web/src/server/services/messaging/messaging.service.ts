import { eq, and, desc, or, sql } from "drizzle-orm"
import { EventEmitter } from "events"
import { db } from "@/db/drizzle"
import {
   conversations,
   messages,
   candidateProfiles,
   recruitersProfiles,
   user,
   contactRequests,
} from "@/db/schema"
import { attempt, attemptSync } from "@/utils/attempt"
import { alias } from "drizzle-orm/pg-core"
import { sse } from "elysia"

class MessageEventEmitter extends EventEmitter {}
const messageEmitter = new MessageEventEmitter()

export function emitNewMessage(conversationId: string, message: any) {
   messageEmitter.emit(`conversation:${conversationId}`, message)
}

const userCandidate = alias(user, "candidateUser")
const userRecruiter = alias(user, "recruiterUser")

export class ConversationService {
   static async getConversations({
      user: authContextUser,
      set,
   }: {
      user: { id: string }
      set: any
   }) {
      const userId = authContextUser.id

      const conversationsRes = await attempt(() =>
         db
            .select({
               id: conversations.id,
               contactRequestId: conversations.contactRequestId,
               candidateId: conversations.candidateId,
               recruiterId: conversations.recruiterId,
               lastMessageAt: conversations.lastMessageAt,
               createdAt: conversations.createdAt,
               candidateName: sql`${userCandidate.name}`,
               candidateGithub: sql`${candidateProfiles.githubUsername}`,
               recruiterName: sql`${userRecruiter.name}`,
               recruiterCompany: sql`${recruitersProfiles.companyName}`,
            })
            .from(conversations)
            .leftJoin(userCandidate, eq(conversations.candidateId, userCandidate.id))
            .leftJoin(candidateProfiles, eq(conversations.candidateId, candidateProfiles.userId))
            .leftJoin(userRecruiter, eq(conversations.recruiterId, userRecruiter.id))
            .leftJoin(recruitersProfiles, eq(conversations.recruiterId, recruitersProfiles.userId))
            .where(or(eq(conversations.candidateId, userId), eq(conversations.recruiterId, userId)))
            .orderBy(desc(conversations.lastMessageAt))
      )

      if (!conversationsRes.ok) {
         console.error("Error fetching conversations:", conversationsRes.error)
         set.status = 500
         return { success: false, message: "Failed to fetch conversations" }
      }

      return {
         success: true,
         conversations: conversationsRes.data,
      }
   }

   static async getOrCreateConversation({
      set,
      user: authContextUser,
      body,
   }: {
      set: any
      user: { id: string; role: string }
      body: { contactRequestId: string }
   }) {
      const userId = authContextUser.id
      const { contactRequestId } = body

      const existingRes = await attempt(() =>
         db
            .select()
            .from(conversations)
            .where(eq(conversations.contactRequestId, contactRequestId))
            .limit(1)
      )

      if (!existingRes.ok) {
         set.status = 500
         return { success: false, message: "Failed to check existing conversation" }
      }

      if (existingRes.data.length > 0) {
         return { success: true, conversation: existingRes.data[0] }
      }

      const createRes = await attempt(() =>
         db
            .insert(conversations)
            .values({
               id: crypto.randomUUID(),
               contactRequestId,
               candidateId: userId,
               recruiterId: userId,
            })
            .returning()
      )

      if (!createRes.ok) {
         console.error("Failed to create conversation:", createRes.error)
         set.status = 500
         return { success: false, message: "Failed to create conversation" }
      }

      return { success: true, conversation: createRes.data[0] }
   }

   static async createConversationForContactRequest({
      contactRequestId,
      candidateId,
      recruiterId,
   }: {
      contactRequestId: string
      candidateId: string
      recruiterId: string
   }) {
      const existingRes = await db
         .select()
         .from(conversations)
         .where(eq(conversations.contactRequestId, contactRequestId))
         .limit(1)

      if (existingRes.length > 0) {
         return { success: true, conversation: existingRes[0] }
      }

      const createRes = await db
         .insert(conversations)
         .values({
            id: crypto.randomUUID(),
            contactRequestId,
            candidateId,
            recruiterId,
         })
         .returning()

      if (createRes.length === 0) {
         return { success: false, message: "Failed to create conversation" }
      }

      return { success: true, conversation: createRes[0] }
   }

   static async createConversationWithMessage({
      set,
      user: authContextUser,
      body,
   }: {
      set: any
      user: { id: string }
      body: { contactRequestId: string; initialMessage?: string }
   }) {
      const senderId = authContextUser.id
      const { contactRequestId, initialMessage } = body

      const contactReqRes = await attempt(() =>
         db.select().from(contactRequests).where(eq(contactRequests.id, contactRequestId)).limit(1)
      )

      if (!contactReqRes.ok || contactReqRes.data.length === 0) {
         set.status = 404
         return { success: false, message: "Contact request not found" }
      }

      const contactReq = contactReqRes.data[0]

      if (contactReq.status !== "accepted") {
         set.status = 400
         return { success: false, message: "Contact request must be accepted first" }
      }

      const existingRes = await db
         .select()
         .from(conversations)
         .where(eq(conversations.contactRequestId, contactRequestId))
         .limit(1)

      if (existingRes.length > 0) {
         if (initialMessage) {
            await db.insert(messages).values({
               id: crypto.randomUUID(),
               conversationId: existingRes[0].id,
               senderId,
               content: initialMessage,
            })
            await db
               .update(conversations)
               .set({ lastMessageAt: new Date() })
               .where(eq(conversations.id, existingRes[0].id))
         }
         return { success: true, conversation: existingRes[0] }
      }

      const conversationId = crypto.randomUUID()

      const createRes = await db
         .insert(conversations)
         .values({
            id: conversationId,
            contactRequestId,
            candidateId: contactReq.candidateId,
            recruiterId: contactReq.recruiterId,
         })
         .returning()

      if (createRes.length === 0) {
         set.status = 500
         return { success: false, message: "Failed to create conversation" }
      }

      if (initialMessage) {
         await db.insert(messages).values({
            id: crypto.randomUUID(),
            conversationId,
            senderId,
            content: initialMessage,
         })
         await db
            .update(conversations)
            .set({ lastMessageAt: new Date() })
            .where(eq(conversations.id, conversationId))
      }

      return { success: true, conversation: createRes[0] }
   }
}

export class MessageService {
   static async getMessages({
      set,
      user: authContextUser,
      params,
   }: {
      set: any
      user: { id: string }
      params: { conversationId: string }
   }) {
      const userId = authContextUser.id
      const { conversationId } = params

      const convCheckRes = await attempt(() =>
         db
            .select()
            .from(conversations)
            .where(
               and(
                  eq(conversations.id, conversationId),
                  or(eq(conversations.candidateId, userId), eq(conversations.recruiterId, userId))
               )
            )
            .limit(1)
      )

      if (!convCheckRes.ok || convCheckRes.data.length === 0) {
         set.status = 403
         return { success: false, message: "Conversation not found or access denied" }
      }

      const messagesRes = await attempt(() =>
         db
            .select({
               id: messages.id,
               conversationId: messages.conversationId,
               senderId: messages.senderId,
               content: messages.content,
               createdAt: messages.createdAt,
               senderName: user.name,
            })
            .from(messages)
            .leftJoin(user, eq(messages.senderId, user.id))
            .where(eq(messages.conversationId, conversationId))
            .orderBy(messages.createdAt)
      )

      if (!messagesRes.ok) {
         console.error("Error fetching messages:", messagesRes.error)
         set.status = 500
         return { success: false, message: "Failed to fetch messages" }
      }

      return {
         success: true,
         messages: messagesRes.data,
      }
   }

   static async sendMessage({
      set,
      user: authContextUser,
      params,
      body,
   }: {
      set: any
      user: { id: string }
      params: { conversationId: string }
      body: { content: string }
   }) {
      const senderId = authContextUser.id
      const { conversationId } = params
      const { content } = body

      const convCheckRes = await attempt(() =>
         db
            .select()
            .from(conversations)
            .where(
               and(
                  eq(conversations.id, conversationId),
                  or(
                     eq(conversations.candidateId, senderId),
                     eq(conversations.recruiterId, senderId)
                  )
               )
            )
            .limit(1)
      )

      if (!convCheckRes.ok || convCheckRes.data.length === 0) {
         set.status = 403
         return {
            success: false,
            message: "Conversation not found or access denied",
         }
      }

      const messageRes = await attempt(() =>
         db
            .insert(messages)
            .values({
               id: crypto.randomUUID(),
               conversationId,
               senderId,
               content,
            })
            .returning()
      )

      if (!messageRes.ok) {
         console.error("Failed to send message:", messageRes.error)
         set.status = 500
         return {
            success: false,
            message: "Failed to send message",
         }
      }

      await db
         .update(conversations)
         .set({ lastMessageAt: new Date() })
         .where(eq(conversations.id, conversationId))

      const createdMessage = messageRes.data[0]

      const senderRes = await attempt(() =>
         db.select({ name: user.name }).from(user).where(eq(user.id, senderId)).limit(1)
      )

      const messageWithSender = {
         ...createdMessage,
         senderName: senderRes.ok && senderRes.data[0] ? senderRes.data[0].name : "Unknown",
      }

      emitNewMessage(conversationId, messageWithSender)

      return {
         success: true,
         message: messageWithSender,
      }
   }

   static async *streamMessages({ params }: { params: { conversationId: string }; set: any }) {
      const { conversationId } = params

      yield sse({ data: JSON.stringify({ type: "connected" }) })

      const sendEvent = (data: any) => {
         return sse({ data: JSON.stringify(data) })
      }

      const messageHandler = (message: any) => {
         const sendEveAttempt = attemptSync(() =>
            sendEvent({
               type: "new_message",
               message,
            })
         )
         if (!sendEveAttempt.ok) {
            console.error("Error in message handler:", sendEveAttempt.error)
         }
      }

      messageEmitter.on(`conversation:${conversationId}`, messageHandler)

      await attempt(() => new Promise(() => {}), {
         onTearDown: () => {
            messageEmitter.off(`conversation:${conversationId}`, messageHandler)
         },
      })
   }
}
