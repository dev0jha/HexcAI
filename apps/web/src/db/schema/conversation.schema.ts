import { user } from "@/db/schema/auth.schema"
import { relations } from "drizzle-orm"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

import { contactRequests } from "./contactRequest.schema"
import { messages } from "./message.schema"

export const conversations = pgTable("conversations", {
   id: text("id").primaryKey(),
   contactRequestId: text("contact_request_id")
      .notNull()
      .references(() => contactRequests.id, { onDelete: "cascade" }),
   candidateId: text("candidate_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
   recruiterId: text("recruiter_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
   lastMessageAt: timestamp("last_message_at").defaultNow().notNull(),
   createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const conversationParticipants = pgTable("conversation_participants", {
   id: text("id").primaryKey(),

   conversationId: text("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),

   userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

   lastReadAt: timestamp("last_read_at"),
})

export const conversationRelations = relations(conversations, ({ many }) => ({
   messages: many(messages),
}))

export type Conversation = typeof conversations.$inferSelect
export type InsertConversation = typeof conversations.$inferInsert
