import { Switch } from "@/components/ui/switch"

interface StatusCardProps {
   isOpenToRecruiters: boolean
   profileCompleteness: number
   onToggleRecruiters: (checked: boolean) => void
   isPending: boolean
}

export function StatusCard({
   isOpenToRecruiters,
   profileCompleteness,
   onToggleRecruiters,
   isPending,
}: StatusCardProps) {
   return (
      <div className="rounded-xl border border-zinc-800 bg-neutral-800/20 p-6 backdrop-blur-sm">
         <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
               <h3 className="font-medium text-zinc-100">Open to Recruiters</h3>
               <p className="text-xs text-zinc-500">Visible in search results</p>
            </div>
            <Switch
               checked={isOpenToRecruiters}
               onCheckedChange={onToggleRecruiters}
               disabled={isPending}
               className="data-[state=checked]:bg-emerald-500"
            />
         </div>

         <div className="space-y-3">
            <div className="flex justify-between text-xs">
               <span className="text-zinc-400">Profile Completeness</span>
               <span className="text-zinc-200 font-medium">{profileCompleteness}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-zinc-800">
               <div
                  className="h-full rounded-full bg-indigo-500"
                  style={{ width: `${profileCompleteness}%` }}
               />
            </div>
         </div>
      </div>
   )
}
