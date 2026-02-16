import { json, pgTable, text, timestamp, integer, real } from "drizzle-orm/pg-core"

import { user } from "@/db/schema/auth.schema"

export const analysis = pgTable("analysis", {
   id: text("id").primaryKey(),
   candidateId: text("candidate_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
   repoUrl: text("repo_url").notNull(),
   name: text("name").notNull(),
   language: text("language"),
   stars: integer("stars").default(0),
   description: text("description"),
   scoreBreakdown: json("score_breakdown").default({}).notNull(),
   totalScore: real("total_score").notNull(),
   feedback: json("feedback").default([]).notNull(),
   summary: text("summary"),
   createdAt: timestamp("created_at").defaultNow().notNull(),
})

export type Analysis = typeof analysis.$inferSelect

export type InsertAnalysis = typeof analysis.$inferInsert

export type UpdateAnalysis = Partial<InsertAnalysis>
