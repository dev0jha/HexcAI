import { atom } from "jotai";
import type { Atom } from "jotai";

import { createScopedAtoms } from "@/lib/state/scoped-stores";

interface SettingAtoms {
  isSaving: Atom<boolean>;
  isOpenToRecruiters: Atom<boolean>;
}

/*
 * Component level scoped store for settings page
 * **/
export const SettingStore = createScopedAtoms<SettingAtoms>((defaults) => ({
  isSaving: atom<boolean>(defaults?.isSaving ?? false),
  isOpenToRecruiters: atom<boolean>(defaults?.isOpenToRecruiters ?? false),
}));
