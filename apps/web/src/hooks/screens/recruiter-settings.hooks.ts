import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { RecruiterSettingStore } from "@/hooks/scopedstores/recruiter-settings.store"
import { updateUserMutation } from "@/lib/queries/queryOptions"
import { queryKeys } from "@/lib/queries/queryKeys"

export function useRecruiterSaveSettingsStatus() {
   const [isSaving, setIsSaving] = RecruiterSettingStore.useAtom("isSaving")
   return {
      isSaving,
      setIsSaving,
   }
}

export function useRecruiterPublicProfileSetting() {
   const [isPublicProfile, setIsPublicProfile] = RecruiterSettingStore.useAtom("isPublicProfile")
   return {
      isPublicProfile,
      setIsPublicProfile,
   }
}

export function useRecruiterSaveSettingsAction() {
   const { setIsSaving } = useRecruiterSaveSettingsStatus()
   const queryClient = useQueryClient()

   const mutation = useMutation({
      ...updateUserMutation,
      onMutate: () => {
         setIsSaving(true)
      },
      onSuccess: () => {
         toast.success("Profile updated successfully!")
         queryClient.invalidateQueries({ queryKey: queryKeys.user() })
      },
      onError: (error: Error) => {
         toast.error(error.message || "Failed to update profile")
      },
      onSettled: () => {
         setIsSaving(false)
      },
   })

   function handleSave(payload: { name?: string; company?: string; position?: string }) {
      mutation.mutate(payload)
   }

   return {
      handleSave,
      isSaving: mutation.isPending,
      setIsSaving,
   }
}
