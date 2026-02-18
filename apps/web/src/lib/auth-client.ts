import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAuthClient } from "better-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

export const authClient = createAuthClient({
   baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
})

function useReactiveSession() {
   const router = useRouter()
   const { data: session, error, refetch, isPending, isRefetching } = authClient.useSession()
   const initialRetried = useRef<boolean>(false)

   const isSessionLoading = isPending || isRefetching

   useEffect(() => {
      if (error && initialRetried.current) {
         router.refresh()
      }

      if (!session && !initialRetried.current) {
         refetch()

         initialRetried.current = true
      }
   }, [session])

   return {
      session,
      error,
      isSessionLoading,
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
