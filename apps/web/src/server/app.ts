import { HealthService, AnalysisService } from "@/server/services"
import { Elysia } from "elysia"
import { openapi } from "@elysiajs/openapi"
import { betterAuthmiddleware } from "@/server/middlewares/auth.middleware"
import { repoAnalysisRequestBodySchema } from "@/server/services/analysis/analysis.validation"
export const app = new Elysia({ prefix: "/api" })
  .use(openapi())
  .use(betterAuthmiddleware)
  .get("/user", ({ user }) => user, { auth: true })
  .get("/health", HealthService.getStatus)
  .post("/analyze", AnalysisService.analyzeRepository, {
    body: repoAnalysisRequestBodySchema,
  })

export type API = typeof app
