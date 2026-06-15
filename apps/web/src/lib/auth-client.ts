import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAuthClient } from "better-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

function getBaseURL() {
   if (typeof window !== "undefined") return window.location.origin
   if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL
   if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL
   throw new Error("BETTER_AUTH_URL or NEXT_PUBLIC_APP_URL must be set")
}

export const authClient = createAuthClient({
   baseURL: getBaseURL(),
})

const MAX_SESSION_RETRIES = 3

function useReactiveSession() {
   const router = useRouter()
   const { data: session, error, refetch, isPending, isRefetching } = authClient.useSession()
   const retryCount = useRef(0)

   const isSessionLoading = isPending || isRefetching

   useEffect(() => {
      if (error) {
         if (retryCount.current < MAX_SESSION_RETRIES) {
            retryCount.current++
            refetch()
         }
         return
      }

      if (!session && !error && retryCount.current === 0) {
         retryCount.current++
         refetch()
      }
   }, [session, error, refetch])

   return {
      session,
      error: error as Error | null,
      isSessionLoading: isSessionLoading && retryCount.current <= MAX_SESSION_RETRIES,
   }
}

function useUpdateUser() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async (data: { name?: string; image?: string | null }) => {
         const { data: result, error } = await authClient.updateUser(data)
         if (error) {
            throw error
         }
         return result
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["session"] })
      },
   })
}

const { signIn, signOut, signUp } = authClient

export { signIn, signOut, signUp, useReactiveSession, useUpdateUser }
