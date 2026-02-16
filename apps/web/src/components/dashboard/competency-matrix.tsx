import { DeveloperRadarChart } from "@/components/discover/radar-chart"

export function CompetencyMatrix() {
   return (
      <div className="rounded-xl border border-zinc-800 bg-neutral-800/20 backdrop-blur-sm">
         <div className="border-zinc-800 px-6 py-4">
            <h3 className="text-base font-semibold text-zinc-100">Competency Matrix</h3>
            <p className="text-sm text-zinc-500">Visual breakdown of your engineering strengths.</p>
         </div>
         <div className="flex items-center justify-center p-6 py-11">
            <div className="h-75 w-full">
               <DeveloperRadarChart />
            </div>
         </div>
      </div>
   )
}
