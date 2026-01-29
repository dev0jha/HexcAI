"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockDevelopers } from "@/data/mock-data"
import { Camera, Loader2 } from "lucide-react"
import DashTitleShell from "@/components/dash-screentitle-text"
import { DashboardCard } from "@/components/layout/dashboard-card"

export default function SettingsPage() {
  const developer = mockDevelopers[0]
  const [isSaving, setIsSaving] = useState(false)
  const [isOpenToRecruiters, setIsOpenToRecruiters] = useState(developer.isOpenToRecruiters)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-8 lg:py-10 mt-4 sm:mt-6">
      <div className="space-y-8">
        <DashTitleShell
          title="Settings"
          description="Manage your account preferences and profile visibility"
        />

        <form onSubmit={handleSave}>
          <div className="max-w-4xl space-y-8">
            {/* Profile Section */}
            <DashboardCard className="p-6 border-dashed bg-transparent relative">
              <h2 className="text-lg font-semibold mb-6 text-white border-b border-white/5 pb-4">
                Profile Information
              </h2>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-2 border-white/10 ring-4 ring-primary/10">
                    <AvatarImage src={developer.avatar} alt={developer.name} />
                    <AvatarFallback className="bg-zinc-800 text-xl">
                      {developer.name
                        .split(" ")
                        .map(n => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full shadow-lg border border-white/10"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <p className="font-bold text-lg text-white">{developer.name}</p>
                  <p className="text-sm text-zinc-400">@{developer.username}</p>
                  <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest font-bold">
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
                    className="bg-white/5 border-white/10 text-white focus:ring-primary/50"
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
                    className="bg-white/5 border-white/10 text-white focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-zinc-400">
                    Locale
                  </Label>
                  <Input
                    id="location"
                    defaultValue={developer.location}
                    className="bg-white/5 border-white/10 text-white focus:ring-primary/50"
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
                    className="bg-white/5 border-white/10 text-white focus:ring-primary/50"
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
                    className="bg-white/5 border-white/10 text-white focus:ring-primary/50 resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-zinc-400">
                    LinkedIn Profile
                  </Label>
                  <Input
                    id="linkedin"
                    defaultValue={developer.linkedIn}
                    className="bg-white/5 border-white/10 text-white focus:ring-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="techstack" className="text-zinc-400">
                    Core Technologies
                  </Label>
                  <Input
                    id="techstack"
                    defaultValue={developer.techStack.join(", ")}
                    className="bg-white/5 border-white/10 text-white focus:ring-primary/50"
                  />
                </div>
              </div>
            </DashboardCard>

            {/* Visibility Section */}
            <DashboardCard className="p-6 border-dashed bg-transparent relative">
              <h2 className="text-lg font-semibold mb-6 text-white border-b border-white/5 pb-4">
                Recruiter Visibility
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="max-w-md">
                  <p className="font-medium text-white">Active Recruitment Status</p>
                  <p className="text-sm text-zinc-500 mt-1">
                    When active, your profile and analysis results are discoverable by verified
                    recruiters looking for talent.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-tighter">
                    {isOpenToRecruiters ? "Discovery On" : "Discovery Off"}
                  </span>
                  <Switch checked={isOpenToRecruiters} onCheckedChange={setIsOpenToRecruiters} />
                </div>
              </div>
              {developer.score < 80 && (
                <div className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <p className="text-xs text-yellow-500/80 font-medium italic">
                    Current profile score is {developer.score}. You need a minimum score of 80 to
                    enable recruiter discovery.
                  </p>
                </div>
              )}
            </DashboardCard>

            {/* Notifications Section */}
            <DashboardCard className="p-6 border-dashed bg-transparent relative">
              <h2 className="text-lg font-semibold mb-6 text-white border-b border-white/5 pb-4">
                Communication Preferences
              </h2>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-medium text-white">Direct Message Notifications</p>
                    <p className="text-sm text-zinc-500">
                      Receive real-time email alerts when a recruiter sends you a direct contact
                      request.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator className="bg-white/5" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="font-medium text-white">System Reports & Analysis</p>
                    <p className="text-sm text-zinc-500">
                      Weekly digest of your profile performance and new automated analysis results.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </DashboardCard>

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSaving}
                className="w-full sm:w-auto px-8 py-6 h-auto text-md font-bold"
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
          </div>
        </form>
      </div>
    </div>
  )
}
