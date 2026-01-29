"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { LogOut } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
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
          onSuccess: () => {
            router.push("/")
          },
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
      className={cn(
        "text-xs text-white dark:text-black w-full rounded-lg shadow-xl",
        className
      )}
    >
      <LogOut />
      Sign out
    </Button>
  )
}
