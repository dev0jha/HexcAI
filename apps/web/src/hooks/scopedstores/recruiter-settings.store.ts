import { Atom } from "jotai"

import { atomizeValues, createScopedAtoms } from "@/lib/state/scoped-stores"

interface RecruiterSettingStoreState {
   isSaving: Atom<boolean>
   name: Atom<string>
   company: Atom<string>
   isPublicProfile: Atom<boolean>
}

export const RecruiterSettingStore = createScopedAtoms<RecruiterSettingStoreState>(
   defaults =>
      atomizeValues({
         isSaving: false,
         name: "",
         company: "",
         isPublicProfile: true,
         ...defaults,
      }) satisfies RecruiterSettingStoreState
)
