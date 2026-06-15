import { treaty } from "@elysiajs/eden"

import type { API } from "@/server/app"

function createClient() {
   const baseURL = process.env.NEXT_PUBLIC_APP_URL
   if (!baseURL) {
      throw new Error(
         "NEXT_PUBLIC_APP_URL is not set. Set it in your .env or Vercel project environment variables."
      )
   }
   return treaty<API>(baseURL, {
      fetch: {
         credentials: "include",
      },
   }).api
}

export const apiClient = createClient()
