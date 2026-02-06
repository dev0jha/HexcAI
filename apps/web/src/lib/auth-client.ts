import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
   baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
})

function useReactiveSession() {
   return useQuery({
      queryKey: ["session"],
      queryFn: async () => {
         const { data, error } = await authClient.getSession()
         if (error) {
            throw error
         }
         return data
      },
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 0,
      placeholderData: keepPreviousData,
   })
}

const { signIn, signOut, signUp } = authClient

export { signIn, signOut, signUp, useReactiveSession }
