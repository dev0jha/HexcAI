import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
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
         // Invalidate session to refresh user data everywhere
         queryClient.invalidateQueries({ queryKey: ["session"] })
      },
   })
}

const { signIn, signOut, signUp } = authClient

export { signIn, signOut, signUp, useReactiveSession, useUpdateUser }
