"use client"

import React from "react"
import { Camera, Loader2 } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

import Container from "@/components/core/Container"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

import {
   useRecruiterSaveSettingsAction,
   useRecruiterSaveSettingsStatus,
} from "@/hooks/screens/recruiter-settings.hooks"
import { createUserQueryOptions } from "@/lib/queries/queryOptions"

interface UserData {
   name?: string
   email?: string
   image?: string
   company?: string
   position?: string
}

export default function RecruiterSettingsPage() {
   return (
      <Container className="py-12">
         <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="mb-10">
               <h1 className="text-2xl font-bold tracking-tight text-white">Recruiter Profile</h1>
               <p className="text-zinc-500 text-sm">
                  Manage your company details and account settings.
               </p>
            </div>

            <RecruiterSettingsForm />
         </div>
      </Container>
   )
}

function RecruiterSettingsForm() {
   const { data, isLoading } = useQuery(createUserQueryOptions())
   const user = data as UserData | undefined

   const { handleSave } = useRecruiterSaveSettingsAction()

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)

      const payload = {
         name: formData.get("name") as string,
         company: formData.get("company") as string,
         position: formData.get("position") as string,
      }

      handleSave(payload as any)
   }

   if (isLoading) {
      return (
         <div className="flex h-64 items-center justify-center">
            <Loader2 className="text-zinc-500 h-6 w-6 animate-spin" />
         </div>
      )
   }

   return (
      <form onSubmit={handleSubmit} className="space-y-8">
         {/* 1. IDENTITY (Clean Row) */}
         <div className="flex items-center gap-6">
            <div className="group relative">
               <Avatar className="h-20 w-20 border-2 border-zinc-800">
                  <AvatarImage
                     src={user?.image || "/recruiter-portrait-male-professional.jpg"}
                     alt={user?.name || "User"}
                     className="object-cover"
                  />
                  <AvatarFallback className="bg-zinc-900 text-zinc-500">
                     {user?.name?.substring(0, 2).toUpperCase() || "RE"}
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
               <h3 className="font-medium text-white text-lg">{user?.name || "Recruiter"}</h3>
               <p className="text-zinc-500 text-sm">{user?.email || "recruiter@example.com"}</p>
            </div>
         </div>

         <Separator className="bg-zinc-800" />

         {/* 2. FORM GRID (Flat & Spacious) */}
         <div className="space-y-6">
            <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
               {/* Full Name */}
               <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs text-zinc-500 font-normal">
                     Full Name
                  </Label>
                  <Input
                     id="name"
                     name="name"
                     defaultValue={user?.name || ""}
                     className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10"
                     placeholder="John Smith"
                  />
               </div>

               {/* Email (Disabled) */}
               <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs text-zinc-500 font-normal">
                     Email Address
                  </Label>
                  <Input
                     id="email"
                     type="email"
                     defaultValue={user?.email || ""}
                     disabled
                     className="bg-zinc-900/50 border-zinc-800 text-zinc-500 focus:border-zinc-700 focus:ring-0 h-10 opacity-60 cursor-not-allowed"
                  />
               </div>

               {/* Company Name */}
               <div className="space-y-2">
                  <Label htmlFor="company" className="text-xs text-zinc-500 font-normal">
                     Company Name
                  </Label>
                  <Input
                     id="company"
                     name="company"
                     defaultValue={user?.company || ""}
                     className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10"
                     placeholder="TechCorp Inc."
                  />
               </div>

               {/* Position */}
               <div className="space-y-2">
                  <Label htmlFor="position" className="text-xs text-zinc-500 font-normal">
                     Position
                  </Label>
                  <Input
                     id="position"
                     name="position"
                     defaultValue={user?.position || ""}
                     className="bg-zinc-900/50 border-zinc-800 text-zinc-200 focus:border-zinc-700 focus:ring-0 h-10"
                     placeholder="Senior Recruiter"
                  />
               </div>
            </div>
         </div>

         <Separator className="bg-zinc-800" />

         {/* 3. SETTINGS (Toggle) */}
         <div className="flex items-center justify-between">
            <div className="space-y-1">
               <p className="text-sm font-medium text-zinc-200">Public Profile</p>
               <p className="text-xs text-zinc-500">
                  Allow candidates to view your recruiter profile.
               </p>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-xs font-medium text-emerald-500">Active</span>
               <Switch defaultChecked className="data-[state=checked]:bg-emerald-600" />
            </div>
         </div>

         {/* 4. ACTIONS */}
         <div className="pt-2">
            <SaveButton />
         </div>
      </form>
   )
}

function SaveButton() {
   const { isSaving } = useRecruiterSaveSettingsStatus()

   return (
      <Button
         type="submit"
         disabled={isSaving}
         className="bg-white text-black hover:bg-zinc-200 w-full sm:w-auto font-medium h-10 px-8"
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
