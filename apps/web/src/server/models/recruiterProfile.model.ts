import { boolean, pgTable, text } from "drizzle-orm/pg-core";

import { user } from "@/db/schema/auth-schema";

export const recruitersProfiles = pgTable("recruiters", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),
  companyName: text("company_name").notNull(),
  companyWebsite: text("company_website"),
  isVerified: boolean("is_verified").default(false).notNull(),
});
