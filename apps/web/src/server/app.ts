import { openapi } from "@elysiajs/openapi"
import { Elysia, t } from "elysia"

import { betterAuthmiddleware } from "@/server/middlewares/auth.middleware"
import { AnalysisService, HealthService, DevelopersService, UserService } from "@/server/services"
import { ContactRequestService } from "@/server/services/contact-requests/contact-requests.service"

import { repoAnalysisRequestBodySchema } from "./services/analysis/analysis.validation"
import {
   contactRequestQuerySchema,
   createContactRequestSchema,
   updateContactRequestSchema,
} from "./services/contact-requests/contact-requests.validation"
import { developersQuerySchema } from "./services/developers/developers.validation"
import type { UpdateUserBody } from "./services/user/user.types"

const updateUserBodySchema = t.Object({
   name: t.Optional(t.String()),
   company: t.Optional(t.String()),
   position: t.Optional(t.String()),
   bio: t.Optional(t.String()),
   location: t.Optional(t.String()),
   isOpenToRecruiters: t.Optional(t.Boolean()),
})

export const app = new Elysia({ prefix: "/api" })
   .use(openapi())
   .use(betterAuthmiddleware)
   .get("/user", ({ user }) => user, { auth: true })
   .patch("/user", UserService.updateUser, {
      body: updateUserBodySchema,
      auth: true,
   })
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

   .post("/contact-requests", ContactRequestService.createContactRequest, {
      body: createContactRequestSchema,
      auth: true,
   })

   .patch("/contact-requests/:requestId", ContactRequestService.updateContactRequestStatus, {
      params: t.Object({ requestId: t.String() }),
      body: updateContactRequestSchema,
      auth: true,
   })

   .get("/developers", DevelopersService.getDevelopers, {
      query: developersQuerySchema,
   })

   .get("/developers/:username", DevelopersService.getDeveloperByUsername, {})

   .get("/developers/tech-stacks", DevelopersService.getTechStacks, {})

export type API = typeof app
