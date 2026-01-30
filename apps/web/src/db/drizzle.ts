import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";

import * as Schema from "@/db/schema";

config({ path: ".env" });

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: Schema,
});
