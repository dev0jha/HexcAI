import { Elysia } from "elysia"
import indexRouter from "@/server/routes"
import { openapi } from "@elysiajs/openapi"

const app = new Elysia({ prefix: "/api" }).use(openapi()).use(indexRouter)

export type API = typeof app

export const GET = app.fetch
export const POST = app.fetch
