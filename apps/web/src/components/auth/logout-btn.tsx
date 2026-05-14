"use client"

import { useRouter } from "next/navigation"

import { LogOut } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

interface LogoutBtnProps {
   className?: string
}

export default function LogoutBtn({ className }: LogoutBtnProps) {
   const router = useRouter()
   /*
    *
    * Handles the sign-out button click event.
    * **/
   async function handleSignoutClick() {
      toast.promise(
         authClient.signOut({
            fetchOptions: {
               onSuccess: () => router.push("/"),
            },
         }),
         {
            loading: "Signing out...",
            success: "Signed out successfully",
            error: error => "Failed to sign out: " + error.message,
         }
      )
   }

   return (
      <Button
         onClick={handleSignoutClick}
         variant="outline"
         className={cn(
            "w-full cursor-pointer ring-2 ring-neutral-500/10 rounded-sm p-2 text-xs text-zinc-50 font-medium dark:text-white/80",
            className
         )}
      >
         <LogOut />
         Sign out
      </Button>
   )
}
