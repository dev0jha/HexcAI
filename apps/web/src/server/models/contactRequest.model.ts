import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "@/db/schema/auth-schema";

export const contactStatus = ["pending", "accepted", "rejected"] as const;
export type ContactStatus = (typeof contactStatus)[number];

const contactStatusEnum = pgEnum("contact_status", contactStatus);

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
});
