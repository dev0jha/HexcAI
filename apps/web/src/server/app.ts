import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";

import { betterAuthmiddleware } from "@/server/middlewares/auth.middleware";
import { AnalysisService, HealthService } from "@/server/services";

import { repoAnalysisRequestBodySchema } from "./services/analysis/analysis.validation";

export const app = new Elysia({ prefix: "/api" })
  .use(openapi())
  .use(betterAuthmiddleware)
  .get("/user", ({ user }) => user, { auth: true })
  .get("/health", HealthService.getStatus)

  .post("/analyze", AnalysisService.analyzeRepository, {
    body: repoAnalysisRequestBodySchema,
    /*
     *this will be an authenticated route
     * **/
    auth: true,
  });

export type API = typeof app;
