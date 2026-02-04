import { openapi } from "@elysiajs/openapi"
import { Elysia, t } from "elysia"

import { betterAuthmiddleware } from "@/server/middlewares/auth.middleware"
import { AnalysisService, HealthService } from "@/server/services"
import { ContactRequestService } from "@/server/services/contact-requests/contact-requests.service"

import { repoAnalysisRequestBodySchema } from "./services/analysis/analysis.validation"
import {
   contactRequestQuerySchema,
   updateContactRequestSchema,
} from "./services/contact-requests/contact-requests.validation"

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
   })

   .get("/contact-requests", ContactRequestService.getContactRequests, {
      query: contactRequestQuerySchema,
      auth: true,
   })

   .patch("/contact-requests/:requestId", ContactRequestService.updateContactRequestStatus, {
      params: t.Object({ requestId: t.String() }),
      body: updateContactRequestSchema,
      auth: true,
   })

export type API = typeof app
