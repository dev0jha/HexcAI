import { Elysia } from "elysia";

const indexRouter = new Elysia().get("/", () => "HirexAI API service v0.5");

export default indexRouter;
