import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { openAPI } from "better-auth/plugins";

import { db } from "@/db/drizzle";
import { userRoles } from "@/db/schema/enums";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: userRoles.enumValues,
        required: true,
        defaultValue: "user",
      },
    },
  },
  plugins: [openAPI(), nextCookies()],
});
