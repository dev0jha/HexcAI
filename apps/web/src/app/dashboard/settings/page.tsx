"use client"

import { Camera, Loader2 } from "lucide-react"

import Container from "@/components/core/Container"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { SettingStore } from "@/hooks/scopedstores/settings.store"
import {
   useOpenToRecuiterSetting,
   useSaveSettingsAction,
   useSaveSettingsStatus,
   useSettingsFormFields,
} from "@/hooks/screens/settings.hooks"
import { useReactiveSession } from "@/lib/auth-client"
import { grabUserNameInitials } from "@/lib/info"

export default function SettingsPage() {
   const { data: session, isLoading } = useReactiveSession()

   if (isLoading) {
      return (
         <Container className="py-12">
            <div className="mx-auto max-w-2xl flex items-center justify-center min-h-100">
               <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
            </div>
         </Container>
      )
   }

   if (!session?.user) {
      return (
         <Container className="py-12">
            <div className="mx-auto max-w-2xl text-center text-zinc-500">
               Please sign in to access settings.
            </div>
         </Container>
      )
   }

   return (
      <SettingStore.Provider
         defaults={{
            isOpenToRecruiters: true,
            name: session.user.name || "",
         }}
      >
         <Container className="py-12">
            <div className="mx-auto max-w-2xl">
               <div className="mb-10">
                  <h1 className="text-2xl font-bold tracking-tight text-white">Profile</h1>
                  <p className="text-zinc-500 text-sm">
                     Manage your public presence and account details.
                  </p>
               </div>

               <SettingsFormContent user={session.user} />
            </div>
         </Container>
      </SettingStore.Provider>
   )
}

interface User {
   id: string
   name: string
   email: string
   image?: string | null
}

function SettingsFormContent({ user }: { user: User }) {
   const { handleSave } = useSaveSettingsAction()
   const { isOpenToRecruiters, setIsOpenToRecruiters } = useOpenToRecuiterSetting()
   const { name, setName, location, setLocation, portfolio, setPortfolio, bio, setBio } =
      useSettingsFormFields()

   return (
      <form onSubmit={handleSave} className="space-y-8">
         {/* 1. IDENTITY (Clean Row) */}
         <div className="flex items-center gap-6">
            <div className="group relative">
               <Avatar className="h-20 w-20 border-2 border-zinc-800">
                  <AvatarImage src={user.image ?? ""} alt={user.name} />
                  <AvatarFallback className="bg-zinc-900 text-zinc-500">
                     {grabUserNameInitials(user.name)}
                  </AvatarFallback>
               </Avatar>
               <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white border border-black"
               >
                  <Camera className="h-3.5 w-3.5" />
               </Button>
            </div>
            <div className="space-y-1">
               <h3 className="font-medium text-white text-lg">{name || user.name}</h3>
               <p className="text-zinc-500 text-sm">{user.email}</p>
            </div>
         </div>

         <Separator className="bg-zinc-800" />

         {/* 2. FORM GRID (Flat) */}
         <div className="space-y-6">
            <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
               <div className="space-y-2">
                  <Label className="text-xs text-zinc-500 font-normal">Full Name</Label>
                  <Input
                     value={name}
                     onChange={e => setName(e.target.value)}
                     className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10"
                  />
               </div>
               <div className="space-y-2">
                  <Label className="text-xs text-zinc-500 font-normal">Email Address</Label>
                  <Input
                     value={user.email}
                     disabled
                     className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10 disabled:opacity-50"
                  />
               </div>
               <div className="space-y-2">
                  <Label className="text-xs text-zinc-500 font-normal">Location</Label>
                  <Input
                     value={location}
                     onChange={e => setLocation(e.target.value)}
                     placeholder="e.g. San Francisco, CA"
                     className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10"
                  />
               </div>
               <div className="space-y-2">
                  <Label className="text-xs text-zinc-500 font-normal">Portfolio</Label>
                  <Input
                     value={portfolio}
                     onChange={e => setPortfolio(e.target.value)}
                     placeholder="e.g. yoursite.dev"
                     className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10"
                  />
               </div>
               <div className="col-span-2 space-y-2">
                  <Label className="text-xs text-zinc-500 font-normal">Bio</Label>
                  <Textarea
                     value={bio}
                     onChange={e => setBio(e.target.value)}
                     placeholder="Tell us about yourself..."
                     className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 resize-none min-h-20"
                  />
               </div>
            </div>
         </div>

         <Separator className="bg-zinc-800" />

         {/* 3. VISIBILITY (Minimal Toggle) */}
         <div className="flex items-center justify-between">
            <div className="space-y-1">
               <p className="text-sm font-medium text-zinc-200">Recruiter Visibility</p>
               <p className="text-xs text-zinc-500">
                  Allow verified recruiters to view your profile.
               </p>
            </div>
            <div className="flex items-center gap-3">
               <span
                  className={`text-xs font-medium ${isOpenToRecruiters ? "text-emerald-500" : "text-zinc-600"}`}
               >
                  {isOpenToRecruiters ? "Active" : "Hidden"}
               </span>
               <Switch
                  checked={isOpenToRecruiters}
                  onCheckedChange={setIsOpenToRecruiters}
                  className="data-[state=checked]:bg-emerald-600"
               />
            </div>
         </div>

         {/* 4. ACTIONS */}
         <div className="pt-4">
            <SaveButton />
         </div>
      </form>
   )
}

function SaveButton() {
   const { isSaving } = useSaveSettingsStatus()

   return (
      <Button
         type="submit"
         disabled={isSaving}
         className="bg-white text-black hover:bg-zinc-200 w-full sm:w-auto font-medium"
      >
         {isSaving ? (
            <>
               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
               Saving...
            </>
         ) : (
            "Save Changes"
         )}
      </Button>
   )
}
