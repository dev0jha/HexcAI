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
         variant="ghost"
         className={cn(
            "group hidden sm:flex w-full",
            "rounded-lg",
            "bg-zinc-900/60",
            "backdrop-blur-md",
            "border border-zinc-800",
            "shadow-[0_4px_14px_rgba(0,0,0,0.35)]",
            "transition-all duration-200",
            "text-zinc-50 font-medium",
            className
         )}
      >
         <LogOut className="mr-2" />
         Sign out
      </Button>
   )
}
