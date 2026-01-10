import { HealthService } from "@/server/services"
import { Elysia } from "elysia"
import { openapi } from "@elysiajs/openapi"

export const app = new Elysia({ prefix: "/api" })
  .use(openapi())
  .get("/health", HealthService.getStatus)

export type API = typeof app
