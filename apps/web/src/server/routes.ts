import { Elysia } from "elysia"

const indexRouter = new Elysia().get("/", () => "Welcome to the Elysia server!")

export default indexRouter
