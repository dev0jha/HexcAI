import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { IconCode, IconEye, IconSearch } from "@tabler/icons-react"
import { toast } from "sonner"

import { createUserQueryOptions, updateUserMutation } from "@/lib/queries/queryOptions"
import { queryKeys } from "@/lib/queries/queryKeys"

export interface DashboardUser {
   name?: string
   bio?: string
   location?: string
   website?: string
   techStack?: string[]
   username?: string
   score?: number
   profileViews?: number
   searchAppearances?: number
   isOpenToRecruiters?: boolean
}

export interface DashboardStats {
   label: string
   value: string
   trend: string
   icon: typeof IconEye
}

function calculateProfileCompleteness(user: DashboardUser): number {
   const fields = [
      !!user.name,
      !!user.bio,
      !!user.location,
      !!user.website,
      !!user.techStack && user.techStack.length > 0,
      !!user.username,
   ]
   const filledCount = fields.filter(Boolean).length
   return Math.round((filledCount / fields.length) * 100)
}

function getDeveloperStats(developer: DashboardUser): DashboardStats[] {
   return [
      {
         label: "Profile Views",
         value: (developer.profileViews ?? 0).toLocaleString(),
         trend: "+12%",
         icon: IconEye,
      },
      {
         label: "Search Appearances",
         value: (developer.searchAppearances ?? 0).toLocaleString(),
         trend: "+5%",
         icon: IconSearch,
      },
      {
         label: "Code Score",
         value: developer.score?.toString() ?? "0",
         trend: "+2",
         icon: IconCode,
      },
   ]
}

export function useDashboardData() {
   const queryClient = useQueryClient()

   const { data: userData, isLoading: userLoading } = useQuery(createUserQueryOptions())

   const user: DashboardUser | null = userData?.success ? userData.user : null
   const profileCompleteness = user ? calculateProfileCompleteness(user) : 0
   const stats: DashboardStats[] = user ? getDeveloperStats(user) : []

   const updateMutation = useMutation({
      ...updateUserMutation,
      onSuccess: () => {
         toast.success("Profile updated")
         queryClient.invalidateQueries({ queryKey: queryKeys.user() })
      },
      onError: (error: Error) => {
         toast.error(error.message || "Failed to update profile")
      },
   })

   const handleOpenToRecruitersChange = (checked: boolean) => {
      updateMutation.mutate({ isOpenToRecruiters: checked })
   }

   return {
      user,
      userLoading,
      profileCompleteness,
      stats,
      isOpenToRecruiters: user?.isOpenToRecruiters ?? false,
      publicProfileUrl: user?.username ? `/profile/${user.username}` : "#",
      updateMutation,
      handleOpenToRecruitersChange,
   }
}
