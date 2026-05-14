"use client"

import {
   PolarAngleAxis,
   PolarGrid,
   PolarRadiusAxis,
   Radar,
   RadarChart,
   ResponsiveContainer,
} from "recharts"

const data = [
   { subject: "Architecture", A: 120, fullMark: 150 },
   { subject: "Security", A: 98, fullMark: 150 },
   { subject: "Clean Code", A: 86, fullMark: 150 },
   { subject: "Performance", A: 99, fullMark: 150 },
   { subject: "Testing", A: 85, fullMark: 150 },
   { subject: "Documentation", A: 65, fullMark: 150 },
]

export function DeveloperRadarChart() {
   return (
      <div className="h-full w-full min-h-65.5">
         <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
               <defs>
                  <pattern
                     id="diagonalLines"
                     patternUnits="userSpaceOnUse"
                     width="3"
                     height="10"
                     patternTransform="rotate(45)"
                  >
                     <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="10"
                        stroke="#10b981"
                        strokeWidth="4"
                        opacity="0.2"
                     />
                  </pattern>
               </defs>

               <PolarGrid stroke="#333" />
               <PolarAngleAxis
                  dataKey="subject"
                  tick={{
                     fill: "#71717a",
                     fontSize: 12,
                  }}
               />
               <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />

               <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#diagonalLines)"
                  dot={{ r: 3, fill: "#10b981", stroke: "#10b981" }}
               />
            </RadarChart>
         </ResponsiveContainer>
      </div>
   )
}
