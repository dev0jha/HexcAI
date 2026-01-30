import { SettingStore } from "@/hooks/scopedstores/settings.store";

/*
 * Hook to get saving settings status
 * **/
export function useSaveSettingsStatus() {
  const [isSaving, setIsSaving] = SettingStore.useAtom("isSaving");
  return {
    isSaving,
    setIsSaving,
  };
}

/**
 *
 * Is open to recruiters toggle hook
 * **/
export function useOpenToRecuiterSetting() {
  const [isOpenToRecruiters, setIsOpenToRecruiters] =
    SettingStore.useAtom("isOpenToRecruiters");
  return {
    isOpenToRecruiters,
    setIsOpenToRecruiters,
  };
}

/*
 *  Hook to handle saving settings action
 * **/
export function useSaveSettingsAction() {
  const { isSaving, setIsSaving } = useSaveSettingsStatus();

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
  }

  return {
    handleSave,
    isSaving,
    setIsSaving,
  };
}
