import { HealthService } from "@/server/services"
import { Elysia } from "elysia"
import { openapi } from "@elysiajs/openapi"
import { auth } from "@/lib/auth"

const betterAuth = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) return status(401);

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  });

export const app = new Elysia({ prefix: "/api" })
  .use(betterAuth)
  .get("/user", ({ user }) => user, {
    auth: true,
  })
  .use(openapi())
  .get("/health", HealthService.getStatus)
export type API = typeof app
