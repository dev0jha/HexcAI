"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { createContactRequestMutation } from "@/lib/queries/queryOptions"

export function useCreateContactRequest() {
   const queryClient = useQueryClient()

   const mutation = useMutation({
      ...createContactRequestMutation,
      onSuccess: (data, _) => {
         toast.success("Contact request sent successfully!")

         queryClient.invalidateQueries({ queryKey: ["contact-requests"] })

         queryClient.invalidateQueries({
            queryKey: ["contact-requests", "list", { recruiterId: data?.recruiterId }],
         })
      },
      onError: (error: Error) => {
         toast.error(error.message || "Failed to send contact request")
      },
   })

   return {
      createContactRequest: mutation.mutate,
      isLoading: mutation.isPending,
      error: mutation.error,
   }
}
