import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { SettingStore } from "@/hooks/scopedstores/settings.store"
import { updateUserMutation } from "@/lib/queries/queryOptions"
import { queryKeys } from "@/lib/queries/queryKeys"

export function useSaveSettingsStatus() {
   const [isSaving, setIsSaving] = SettingStore.useAtom("isSaving")
   return {
      isSaving,
      setIsSaving,
   }
}

export function useOpenToRecuiterSetting() {
   const [isOpenToRecruiters, setIsOpenToRecruiters] = SettingStore.useAtom("isOpenToRecruiters")
   return {
      isOpenToRecruiters,
      setIsOpenToRecruiters,
   }
}

export function useSaveSettingsAction() {
   const { setIsSaving } = useSaveSettingsStatus()
   const { isOpenToRecruiters } = useOpenToRecuiterSetting()
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

   async function handleSave(e: React.FormEvent) {
      e.preventDefault()
      const formData = new FormData(e.target as HTMLFormElement)
      const name = formData.get("name") as string
      const location = formData.get("location") as string
      const bio = formData.get("bio") as string

      mutation.mutate({
         name,
         location,
         bio,
         isOpenToRecruiters,
      })
   }

   return {
      handleSave,
      isSaving: mutation.isPending,
      setIsSaving,
   }
}
