"use client";

import { Camera, Loader2 } from "lucide-react";

import DashTitleShell from "@/components/dash-screentitle-text";
import { DashboardCard } from "@/components/layout/dashboard-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { mockDevelopers } from "@/data/mock-data";
import { SettingStore } from "@/hooks/scopedstores/settings.store";
import {
  useOpenToRecuiterSetting,
  useSaveSettingsAction,
  useSaveSettingsStatus,
} from "@/hooks/screens/settings.hooks";

export default function SettingsPage() {
  const developer = mockDevelopers[0];

  return (
    <SettingStore.Provider
      defaults={{
        isOpenToRecruiters: developer.isOpenToRecruiters,
      }}
    >
      <div className="mt-12 flex items-center justify-center">
        <div className="space-y-8">
          <DashTitleShell
            title="Settings"
            description="Manage your account preferences and profile visibility"
          />

          {/* Settings form The bigger block */}
          <SettingsFormSection />

          {/*Notification Settings */}
          <NotificationSection />

          {/* Save Action Btn */}
          <SaveActionBtn />
        </div>
      </div>
    </SettingStore.Provider>
  );
}

/*
 *
 *Nofitication Section Component
 * ***/
function NotificationSection() {
  return (
    <DashboardCard className="relative bg-neutral-900 p-6">
      <h2 className="mb-6 border-b border-white/5 pb-4 text-lg font-semibold text-white">
        Communication Preferences
      </h2>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-white">
              Direct Message Notifications
            </p>
            <p className="text-sm text-zinc-500">
              Receive real-time email alerts when a recruiter sends you a direct
              contact request.
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        <Separator className="bg-white/5" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-white">System Reports & Analysis</p>
            <p className="text-sm text-zinc-500">
              Weekly digest of your profile performance and new automated
              analysis results.
            </p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    </DashboardCard>
  );
}

function SettingsFormSection() {
  const developer = mockDevelopers[0];
  const { handleSave } = useSaveSettingsAction();
  const { isOpenToRecruiters, setIsOpenToRecruiters } =
    useOpenToRecuiterSetting();

  return (
    <form onSubmit={handleSave}>
      <div className="max-w-4xl space-y-8">
        {/* Profile Section */}
        <DashboardCard className="relative bg-neutral-900 p-6">
          <h2 className="mb-6 border-b border-white/5 pb-4 text-lg font-semibold text-white">
            Profile Information
          </h2>

          <div className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="group relative">
              <Avatar className="ring-primary/10 h-24 w-24 border-2 border-white/10 ring-4">
                <AvatarImage src={developer.avatar} alt={developer.name} />
                <AvatarFallback className="bg-zinc-800 text-xl">
                  {developer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="absolute -right-1 -bottom-1 h-8 w-8 rounded-full border border-white/10 shadow-lg"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{developer.name}</p>
              <p className="text-sm text-zinc-400">@{developer.username}</p>
              <p className="mt-1 text-xs font-bold tracking-widest text-zinc-500 uppercase">
                Standard Member
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-400">
                Full Name
              </Label>
              <Input
                id="name"
                defaultValue={developer.name}
                className="focus:ring-primary/50 border-white/10 bg-white/5 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-400">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue={developer.email}
                className="focus:ring-primary/50 border-white/10 bg-white/5 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location" className="text-zinc-400">
                Locale
              </Label>
              <Input
                id="location"
                defaultValue={developer.location}
                className="focus:ring-primary/50 border-white/10 bg-white/5 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="text-zinc-400">
                Portfolio URL
              </Label>
              <Input
                id="website"
                type="url"
                defaultValue={developer.website}
                className="focus:ring-primary/50 border-white/10 bg-white/5 text-white"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="bio" className="text-zinc-400">
                Professional Bio
              </Label>
              <Textarea
                id="bio"
                defaultValue={developer.bio}
                rows={4}
                className="focus:ring-primary/50 resize-none border-white/10 bg-white/5 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-zinc-400">
                LinkedIn Profile
              </Label>
              <Input
                id="linkedin"
                defaultValue={developer.linkedIn}
                className="focus:ring-primary/50 border-white/10 bg-white/5 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="techstack" className="text-zinc-400">
                Core Technologies
              </Label>
              <Input
                id="techstack"
                defaultValue={developer.techStack.join(", ")}
                className="focus:ring-primary/50 border-white/10 bg-white/5 text-white"
              />
            </div>
          </div>
        </DashboardCard>

        {/* Visibility Section */}
        <DashboardCard className="relative bg-neutral-900 p-6">
          <h2 className="mb-6 border-b border-white/5 pb-4 text-lg font-semibold text-white">
            Recruiter Visibility
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-md">
              <p className="font-medium text-white">
                Active Recruitment Status
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                When active, your profile and analysis results are discoverable
                by verified recruiters looking for talent.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-tighter text-zinc-500 uppercase">
                {isOpenToRecruiters ? "Discovery On" : "Discovery Off"}
              </span>
              <Switch
                checked={isOpenToRecruiters}
                onCheckedChange={setIsOpenToRecruiters}
              />
            </div>
          </div>
          {developer.score < 80 && (
            <div className="mt-6 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
              <p className="text-xs font-medium text-yellow-500/80 italic">
                Current profile score is {developer.score}. You need a minimum
                score of 80 to enable recruiter discovery.
              </p>
            </div>
          )}
        </DashboardCard>
      </div>
    </form>
  );
}

function SaveActionBtn() {
  const { isSaving } = useSaveSettingsStatus();

  return (
    <div className="flex justify-end pt-4">
      <Button
        type="submit"
        disabled={isSaving}
        className="text-md h-auto w-full px-8 py-6 font-bold sm:w-auto"
      >
        {isSaving ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Saving changes...
          </>
        ) : (
          "Update Settings"
        )}
      </Button>
    </div>
  );
}
