import { openapi } from "@elysiajs/openapi"
import { Elysia, t } from "elysia"

import { betterAuthmiddleware } from "@/server/middlewares/auth.middleware"
import {
   AnalysisService,
   HealthService,
   DevelopersService,
   UserService,
   ConversationService,
   MessageService,
} from "@/server/services"
import { ContactRequestService } from "@/server/services/contact-requests/contact-requests.service"

import { repoAnalysisRequestBodySchema } from "./services/analysis/analysis.validation"
import {
   contactRequestQuerySchema,
   createContactRequestSchema,
   updateContactRequestSchema,
} from "./services/contact-requests/contact-requests.validation"
import { developersQuerySchema } from "./services/developers/developers.validation"
import { updateUserBodySchema } from "@/server/services/user/user.validation"

const sendMessageSchema = t.Object({
   content: t.String({ minLength: 1 }),
})

const createConversationSchema = t.Object({
   contactRequestId: t.String(),
   initialMessage: t.Optional(t.String({ minLength: 1 })),
})

export const app = new Elysia({ prefix: "/api" })
   .use(openapi())
   .use(betterAuthmiddleware)
   .get("/user", UserService.getUser, { auth: true })
   .get("/user/settings", UserService.getUserSettings, { auth: true })
   .patch("/user", UserService.updateUser, {
      body: updateUserBodySchema,
      auth: true,
   })
   .post(
      "/user/image",
      async ({ user, set, request }) => {
         const contentType = request.headers.get("content-type") ?? "image/jpeg"
         const fileName = request.headers.get("x-file-name") ?? "image.jpg"

         const arrayBuffer = await request.arrayBuffer()

         return UserService.uploadProfileImage({
            user,
            set,
            body: {
               imageBuffer: arrayBuffer,
               contentType,
               fileName,
            },
         })
      },
      {
         auth: true,
      }
   )
   .get("/health", HealthService.getStatus)

   .post("/analyze", AnalysisService.analyzeRepository, {
      body: repoAnalysisRequestBodySchema,
      auth: true,
   })
   .get("/analyses", AnalysisService.getAnalysisHistory, {
      auth: true,
   })
   .get("/analyses/:analysisId", AnalysisService.getAnalysisById, {
      auth: true,
   })
   .get("/contact-requests", ContactRequestService.getContactRequests, {
      query: contactRequestQuerySchema,
      auth: true,
   })
   .get("/contact-requests/sent", ContactRequestService.getSentContactRequests, {
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

   .get("/conversations", ConversationService.getConversations, { auth: true })
   .get("/conversations/unread", ConversationService.getConversationsWithUnreadCount, {
      auth: true,
   })
   .get("/conversations/unread/stream", MessageService.streamUnreadUpdates, {
      auth: true,
   })
   .post("/conversations", ConversationService.createConversationWithMessage, {
      body: createConversationSchema,
      auth: true,
   })
   .patch("/conversations/:conversationId/read", ConversationService.markConversationAsRead, {
      params: t.Object({ conversationId: t.String() }),
      auth: true,
   })
   .get("/conversations/:conversationId/messages", MessageService.getMessages, { auth: true })
   .post("/conversations/:conversationId/messages", MessageService.sendMessage, {
      params: t.Object({ conversationId: t.String() }),
      body: sendMessageSchema,
      auth: true,
   })
   .get("/conversations/:conversationId/messages/stream", MessageService.streamMessages, {
      auth: true,
   })

export type API = typeof app
