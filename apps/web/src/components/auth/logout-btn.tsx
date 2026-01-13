import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { LogOut } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function LogoutBtn() {
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
      className="mt-2 text-xs dark:bg-white bg-black text-white dark:text-black w-full hover:bg-black rounded-lg shadow-xl"
    >
      <LogOut />
      Sign out
    </Button>
  )
}
