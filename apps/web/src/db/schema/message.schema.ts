import { user } from "@/db/schema/auth.schema"
import { relations } from "drizzle-orm"
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core"

import { conversations } from "./conversation.schema"

export const messages = pgTable(
   "messages",
   {
      id: text("id").primaryKey(),
      conversationId: text("conversation_id")
         .notNull()
         .references(() => conversations.id, { onDelete: "cascade" }),
      senderId: text("sender_id")
         .notNull()
         .references(() => user.id, { onDelete: "cascade" }),
      content: text("content").notNull(),
      createdAt: timestamp("created_at").defaultNow().notNull(),
   },
   table => [index("messages_conversationId_idx").on(table.conversationId)]
)

export const messageRelations = relations(messages, ({ one }) => ({
   conversation: one(conversations, {
      fields: [messages.conversationId],
      references: [conversations.id],
   }),
   sender: one(user, {
      fields: [messages.senderId],
      references: [user.id],
   }),
}))

export type Message = typeof messages.$inferSelect
export type InsertMessage = typeof messages.$inferInsert
