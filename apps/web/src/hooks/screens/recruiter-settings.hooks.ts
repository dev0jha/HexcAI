import type React from "react"

import { toast } from "sonner"

import { RecruiterSettingStore } from "@/hooks/scopedstores/recruiter-settings.store"

export function useRecruiterSaveSettingsStatus() {
   const [isSaving, setIsSaving] = RecruiterSettingStore.useAtom("isSaving")
   return {
      isSaving,
      setIsSaving,
   }
}

export function useRecruiterSaveSettingsAction() {
   const { isSaving, setIsSaving } = useRecruiterSaveSettingsStatus()
   const [, setName] = RecruiterSettingStore.useAtom("name")
   const [, setCompany] = RecruiterSettingStore.useAtom("company")

   async function handleSave(e: React.FormEvent) {
      e.preventDefault()
      setIsSaving(true)

      // Harvest values from form
      const formData = new FormData(e.target as HTMLFormElement)
      const name = formData.get("name") as string
      const company = formData.get("company") as string

      // Mimic API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Commit to local store to update UI immediately
      if (name) {
         setName(name)
      }
      if (company) {
         setCompany(company)
      }

      setIsSaving(false)
      toast.success("Profile updated successfully!")
   }

   return {
      handleSave,
      isSaving,
      setIsSaving,
   }
}
