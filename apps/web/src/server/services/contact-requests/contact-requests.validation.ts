import { t } from "elysia"

export const contactRequestQuerySchema = t.Object({
   page: t.Optional(t.Numeric({ minimum: 1 })),
   limit: t.Optional(t.Numeric({ minimum: 1, maximum: 50 })),
   status: t.Optional(
      t.Union([t.Literal("pending"), t.Literal("accepted"), t.Literal("rejected")])
   ),
})

export const updateContactRequestSchema = t.Object({
   status: t.Union([t.Literal("pending"), t.Literal("accepted"), t.Literal("rejected")]),
})
