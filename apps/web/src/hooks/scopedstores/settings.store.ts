import { Atom } from "jotai"

import { atomizeValues, createScopedAtoms } from "@/lib/state/scoped-stores"

interface SettingStoreState {
   isSaving: Atom<boolean>
   isOpenToRecruiters: Atom<boolean>
}

export const SettingStore = createScopedAtoms<SettingStoreState>(
   defaults =>
      atomizeValues({
         isSaving: false,
         isOpenToRecruiters: false,
         ...defaults,
      }) satisfies SettingStoreState
)
