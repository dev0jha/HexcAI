import { Card } from "@/components/ui/card"

export default function HistoryLoading() {
   return (
      <div className="flex h-full w-full flex-col p-4 sm:p-6">
         <div className="mx-auto w-full max-w-4xl xl:max-w-6xl space-y-6 sm:space-y-8">
            <div className="flex flex-col gap-1">
               <div className="h-8 w-48 animate-pulse rounded bg-zinc-800" />
               <div className="h-5 w-72 animate-pulse rounded bg-zinc-800/50" />
            </div>

            <div className="space-y-4">
               {[1, 2, 3, 4, 5].map(i => (
                  <Card key={i} className="border-zinc-800 bg-zinc-900/50 p-4">
                     <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 space-y-3">
                           <div className="flex items-center gap-3">
                              <div className="h-5 w-40 animate-pulse rounded bg-zinc-800" />
                              <div className="h-5 w-16 animate-pulse rounded-full bg-zinc-800/50" />
                           </div>
                           <div className="flex items-center gap-3">
                              <div className="h-4 w-48 animate-pulse rounded bg-zinc-800/50" />
                              <div className="h-4 w-20 animate-pulse rounded bg-zinc-800/50" />
                           </div>
                        </div>
                        <div className="flex items-center gap-4">
                           <div className="h-14 w-14 animate-pulse rounded-xl bg-zinc-800" />
                        </div>
                     </div>
                  </Card>
               ))}
            </div>
         </div>
      </div>
   )
}
