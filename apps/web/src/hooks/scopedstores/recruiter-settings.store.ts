import { atom } from "jotai"
import type { PrimitiveAtom } from "jotai"

import { createScopedAtoms } from "@/lib/state/scoped-stores"

interface RecruiterSettingAtoms {
   isSaving: PrimitiveAtom<boolean>
   name: PrimitiveAtom<string>
   company: PrimitiveAtom<string>
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   [key: string]: PrimitiveAtom<any>
}

export const RecruiterSettingStore = createScopedAtoms<RecruiterSettingAtoms>(defaults => ({
   isSaving: atom<boolean>(defaults?.isSaving ?? false),
   name: atom<string>(defaults?.name ?? ""),
   company: atom<string>(defaults?.company ?? ""),
}))
