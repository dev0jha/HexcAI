import { json, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "@/db/schema/auth-schema";

export const analysis = pgTable("analysis", {
  id: text("id").primaryKey(),
  candidateId: text("candidate_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  repoUrl: text("repo_url").notNull(),
  scoreBreakdown: json("score_breakdown").default({}).notNull(),
  summary: text("summary"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
