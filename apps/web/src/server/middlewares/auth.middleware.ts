import Elysia from "elysia";

import { checkSession } from "@/actions/session.actions";
import { auth } from "@/lib/auth";

export const betterAuthmiddleware = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status }) {
        const session = await checkSession();
        if (!session.success) {
          return status(401);
        }

        const sessionData = session.data;

        return {
          ...sessionData,
        };
      },
    },
  });
