"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight, Code2, LogOut, Search, Settings, Users } from "lucide-react"
import LogoutBtn from "@/components/auth/logout-btn"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { RecruiterSettingStore } from "@/hooks/scopedstores/recruiter-settings.store"
import { authClient, useSession } from "@/lib/auth-client"
import { grabUserNameInitials } from "@/lib/info"
import { cn } from "@/lib/utils"

const navItems = [
   { href: "/recruiter/discover", label: "Discover", icon: Search },
   { href: "/recruiter/candidates", label: "My Candidates", icon: Users },
   { href: "/recruiter/settings", label: "Settings", icon: Settings },
]

export function RecruiterSidebar() {
   const { data: session } = useSession()
   const [nameOverride] = RecruiterSettingStore.useAtom("name")
   const [companyOverride] = RecruiterSettingStore.useAtom("company")
   const pathname = usePathname()
   const router = useRouter()
   const [collapsed, setCollapsed] = useState(false)

   const user = session?.user
   const displayName = nameOverride || user?.name || "Recruiter"
   const displayCompany = companyOverride || (user as any)?.company || "My Company"

   const handleSignout = async () => {
      await authClient.signOut({fetchOptions: {
            onSuccess: () => {
               router.push("/")
            },
         },
      })
   }

   return (
      <aside
         className={cn(
            "border-border bg-sidebar fixed top-0 left-0 z-40 hidden h-screen border-r transition-all duration-300 md:block",
            collapsed ? "w-16" : "w-64"
         )}
      >
         <div className="flex h-full flex-col">
            <div className="border-sidebar-border flex h-16 items-center justify-between border-b px-4">
               <Link href="/" className="flex items-center gap-2">
                  <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                     <Code2 className="text-primary-foreground h-5 w-5" />
                  </div>
                  {!collapsed && (
                     <>
                        <span className="font-bold">HireXAI</span>
                        <span className="bg-primary/20 text-primary rounded px-1.5 py-0.5 text-xs font-medium">
                           AI
                        </span>
                     </>
                  )}
               </Link>
               <Button
                  variant="ghost"
                  size="icon"
                  className="hidden h-8 w-8 md:flex"
                  onClick={() => setCollapsed(!collapsed)}
               >
                  {collapsed ? (
                     <ChevronRight className="h-4 w-4" />
                  ) : (
                     <ChevronLeft className="h-4 w-4" />
                  )}
               </Button>
            </div>

            <nav className="flex-1 space-y-1 p-2">
               {navItems.map(item => (
                  <Link key={item.href} href={item.href}>
                     <Button
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className={cn(
                           "w-full justify-start gap-3",
                           collapsed && "justify-center px-2"
                        )}
                     >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && item.label}
                     </Button>
                  </Link>
               ))}
            </nav>

            <div className="border-sidebar-border border-t p-4">
               <div className={cn("flex flex-col gap-4", collapsed && "items-center")}>
                  {!collapsed && <div className="px-1 text-xs text-neutral-500">Signed in as</div>}

                  <div className={cn("flex gap-3", collapsed && "flex-col items-center")}>
                     <Avatar className="h-8 w-8 border border-white/10">
                        <AvatarImage src={user?.image || ""} alt={displayName} />
                        <AvatarFallback>{grabUserNameInitials(displayName)}</AvatarFallback>
                     </Avatar>

                     {!collapsed && (
                        <div className="flex-1 overflow-hidden">
                           <p className="truncate text-sm leading-tight font-medium text-white">
                              {displayName}
                           </p>
                           <p className="truncate text-xs text-neutral-500">{displayCompany}</p>
                        </div>
                     )}
                  </div>

                  {!collapsed && (
                     <div className="pb-2">
                        <LogoutBtn className="rounded-md bg-white py-2 text-xs text-black hover:bg-white/90" />
                     </div>
                  )}

                  {collapsed && (
                     <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-neutral-400 hover:text-white"
                        onClick={handleSignout}
                     >
                        <LogOut className="h-4 w-4" />
                     </Button>
                  )}
               </div>
            </div>
         </div>
      </aside>
   )
}
