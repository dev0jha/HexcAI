import { treaty } from "@elysiajs/eden";

import type { API } from "@/server/app";

let apiClient: ReturnType<typeof treaty<API>>["api"];

if (typeof window === "undefined") {
  /**
   * Server-side
   * **/
  const { app } = await import("@/server/app");
  apiClient = treaty(app).api;
} else {
  /**
   * Client-side
   * **/
  apiClient = treaty<API>(process.env.NEXT_PUBLIC_APP_URL!, {
    fetch: {
      credentials: "include",
    },
  }).api;
}

export { apiClient };
