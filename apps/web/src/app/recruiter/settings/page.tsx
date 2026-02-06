"use client"

import { Camera, Loader2 } from "lucide-react"
import Container from "@/components/core/Container"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
   useRecruiterSaveSettingsAction,
   useRecruiterSaveSettingsStatus,
} from "@/hooks/screens/recruiter-settings.hooks"
import { useQuery } from "@tanstack/react-query"
import { createUserQueryOptions } from "@/lib/queries/queryOptions"

export default function RecruiterSettingsPage() {
   return (
      <Container className="py-8">
         <div className="mx-auto max-w-4xl space-y-8">
            <div>
               <h1 className="text-3xl font-bold">Settings</h1>
               <p className="text-muted-foreground mt-1">
                  Manage your recruiter profile and company information
               </p>
            </div>
            <RecruiterSettingsForm />
         </div>
      </Container>
   )
}

function RecruiterSettingsForm() {
   const { data: user, isLoading } = useQuery(createUserQueryOptions())
   const { handleSave } = useRecruiterSaveSettingsAction()

   if (isLoading) {
      return (
         <div className="flex h-64 items-center justify-center">
            <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
         </div>
      )
   }

   return (
      <form onSubmit={handleSave}>
         <div className="space-y-6">
            <Card className="p-6">
               <h2 className="mb-6 border-b pb-4 text-xl font-semibold">Profile Information</h2>

               <div className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                  <div className="group relative">
                     <Avatar className="border-border h-24 w-24 border-2 shadow-sm">
                        <AvatarImage
                           src={user?.image || "/recruiter-portrait-male-professional.jpg"}
                           alt={user?.name || "User"}
                        />
                        <AvatarFallback className="text-xl">
                           {user?.name?.substring(0, 2).toUpperCase() || "RE"}
                        </AvatarFallback>
                     </Avatar>
                     <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        className="absolute -right-1 -bottom-1 h-8 w-8 rounded-full border shadow-lg"
                     >
                        <Camera className="h-4 w-4" />
                     </Button>
                  </div>
                  <div>
                     <p className="text-lg font-bold">{user?.name || "Recruiter"}</p>
                     <p className="text-muted-foreground text-sm">{user?.email}</p>
                     <p className="text-primary mt-1 text-xs font-bold tracking-widest uppercase">
                        Verified Recruiter
                     </p>
                  </div>
               </div>

               <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                     <Label htmlFor="name">Full Name</Label>
                     <Input
                        id="name"
                        name="name"
                        defaultValue={user?.name || ""}
                        placeholder="John Smith"
                     />
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="email">Email Address</Label>
                     <Input
                        id="email"
                        type="email"
                        defaultValue={user?.email || ""}
                        disabled
                        className="bg-muted"
                     />
                  </div>

                  <div className="space-y-2">
                     <Label htmlFor="company">Company Name</Label>
                     {/* @ts-ignore */}
                     {/* <Input
                        id="company"
                        name="company"
                        defaultValue={user?.company || ""}
                        placeholder="TechCorp"
                     /> */}
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="position">Position</Label>
                     {/* @ts-ignore */}
                     {/* <Input
                        id="position"
                        defaultValue={user?.position || ""}
                        placeholder="Senior Technical Recruiter"
                     /> */}
                  </div>
               </div>
            </Card>

            <div className="flex justify-end">
               <SaveButton />
            </div>
         </div>
      </form>
   )
}

function SaveButton() {
   const { isSaving } = useRecruiterSaveSettingsStatus()

   return (
      <Button type="submit" disabled={isSaving} className="px-8">
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
