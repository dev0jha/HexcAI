import { user } from "@/db/schema/auth.schema"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { contactStatusEnum } from "./enums"

export const contactRequests = pgTable("contact_requests", {
   id: text("id").primaryKey(),
   recruiterId: text("recruiter_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
   candidateId: text("candidate_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
   message: text("message"),
   status: contactStatusEnum("status").default("pending").notNull(),
   createdAt: timestamp("created_at").defaultNow().notNull(),
})

export type ContactRequest = typeof contactRequests.$inferSelect
export type InsertContactRequest = typeof contactRequests.$inferInsert
export type UpdateContactRequest = Partial<InsertContactRequest>
