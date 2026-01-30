import { boolean, integer, json, pgTable, text } from "drizzle-orm/pg-core";

import { user } from "@/db/schema/auth-schema";

export const candidateProfiles = pgTable("candidate_profiles", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  githubUsername: text("github_username").notNull(),
  score: integer("score").default(0).notNull(),
  scoreBreakdown: json("score_breakdown").default({}).notNull(),
  techStack: json("tech_stack").default([]).notNull(),
  bio: text("bio"),
  location: text("location"),
  isVisible: boolean("is_visible").default(false).notNull(),
});
