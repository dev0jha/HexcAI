import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { IconLock } from "@tabler/icons-react"
import { CheckCircle2, CircleDashed, Server } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"

export const SystemLogs = () => {
  const logs = [
    {
      id: 1,
      method: "POST",
      endpoint: "/v1/analyze/repo",
      status: "success",
      duration: "240ms",
      time: "10:24:01",
    },
    {
      id: 2,
      method: "GET",
      endpoint: "/v1/vectors/embed",
      status: "success",
      duration: "45ms",
      time: "10:24:02",
    },
    {
      id: 3,
      method: "WS",
      endpoint: "socket.io/stream",
      status: "processing",
      duration: "connected",
      time: "10:24:05",
    },
  ]

  return (
    <div className="relative w-full h-full p-6 text-[10px] md:text-xs leading-relaxed overflow-hidden select-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

      <div className="flex items-center gap-2 mb-4 text-zinc-500 relative z-10">
        <Badge className="text-xs tracking-widest font-semibold p-3 text-neutral-50/80 bg-black border border-emerald-gray/10 broder-dashed">
          Live Stream
        </Badge>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
        </div>
      </div>

      <div className="relative z-10 space-y-0 ml-1 border-l border-zinc-800/50">
        {logs.map((log, i) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="relative pl-6 pb-4 last:pb-0 group"
          >
            <div
              className={`absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-full border-2 border-black z-20 ${
                log.status === "processing"
                  ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  : "bg-emerald-500/20"
              }`}
            >
              {log.status === "success" && (
                <div className="absolute inset-0 bg-emerald-500 rounded-full scale-50" />
              )}
              {log.status === "processing" && (
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse" />
              )}
            </div>

            {/* Log Content */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      log.method === "POST"
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        : log.method === "GET"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {log.method}
                  </span>
                  <span className="text-zinc-300 group-hover:text-white transition-colors">
                    {log.endpoint}
                  </span>
                </div>
                <span className="text-zinc-600">{log.duration}</span>
              </div>

              <div className="flex items-center gap-2 text-zinc-500 pl-0.5">
                {log.status === "processing" ? (
                  <CircleDashed className="w-3 h-3 animate-spin text-blue-400" />
                ) : (
                  <CheckCircle2 className="w-3 h-3 text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                )}
                <span>{log.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
    </div>
  )
}

export const DevIdCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative w-full max-w-87.5 h-55  overflow-hidden",
        "bg-black border border-zinc-800",
        "before:absolute before:inset-0 before:bg-linear-to-tr before:from-zinc-900/50 before:via-transparent before:to-zinc-900/50 before:opacity-50",
        className
      )}
    >
      <motion.div
        className="absolute inset-0 w-full h-2.5 bg-linear-to-b from-transparent via-white/5 to-transparent z-10"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-0 h-full p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="w-10 h-8 rounded border border-zinc-700 bg-zinc-900/50 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-size-[250%_250%,100%_100%] animate-[shimmer_3s_infinite]" />
            <div className="grid grid-cols-2 gap-1">
              <div className="w-1 h-1 bg-zinc-600 rounded-full" />
              <div className="w-1 h-1 bg-zinc-600 rounded-full" />
              <div className="w-1 h-1 bg-zinc-600 rounded-full" />
              <div className="w-1 h-1 bg-zinc-600 rounded-full" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-1.5 w-12 bg-zinc-800 rounded-full animate-pulse" />
            <div className="h-2 w-2 rounded-full bg-zinc-800 animate-pulse" />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-2">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
              <div className="absolute inset-0 bg-zinc-800 animate-pulse" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-black rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-zinc-700 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <div className="h-3 w-3/4 bg-zinc-800 rounded animate-pulse" />
            <div className="h-2 w-1/2 bg-zinc-900 rounded animate-pulse" />
          </div>
        </div>

        <div className="space-y-3 mt-2">
          <div className="flex gap-2">
            <div className="h-5 w-12 bg-zinc-900 border border-zinc-800 rounded-md animate-pulse" />
            <div className="h-5 w-16 bg-zinc-900 border border-zinc-800 rounded-md animate-pulse" />
            <div className="h-5 w-10 bg-zinc-900 border border-zinc-800 rounded-md animate-pulse" />
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-zinc-900 flex justify-between items-end opacity-50">
          <div className="flex items-end gap-0.5 h-4">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 bg-zinc-700"
                animate={{ height: ["40%", "100%", "60%"] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                style={{ height: Math.random() * 10 + 5 }}
              />
            ))}
          </div>
          <div className="h-2 w-20 bg-zinc-900 rounded animate-pulse" />
        </div>
      </div>

      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-zinc-700" />
      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-zinc-700" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-zinc-700" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-zinc-700" />
    </div>
  )
}

export const ReactProfile = () => {
  return (
    <motion.div
      className="w-full h-full p-5 text-[10px] leading-relaxed select-none pointer-events-none"
      whileHover={{ scale: 1.02, x: 5 }}
    >
      <div className="text-zinc-600 mb-3 italic flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
        {"// User.tsx"}
      </div>

      {/* Line 1: Definition */}
      <div className="group">
        <span className="text-purple-400">const</span>{" "}
        <span className="text-yellow-200">Engineer</span> <span className="text-zinc-500">=</span>{" "}
        <span className="text-zinc-500">{"({"}</span> <span className="text-sky-300">skills</span>{" "}
        <span className="text-zinc-500">{"})"}</span> <span className="text-purple-400">=&gt;</span>{" "}
        <span className="text-zinc-500">{"{"}</span>
      </div>

      {/* Line 2: Hook */}
      <div className="pl-3 group opacity-80">
        <span className="text-purple-400">const</span> <span className="text-zinc-300">rank</span>{" "}
        <span className="text-zinc-500">=</span> <span className="text-blue-400">useMemo</span>
        <span className="text-zinc-500">(()</span> <span className="text-purple-400">=&gt;</span>{" "}
        <span className="text-emerald-400">"Top 1%"</span>
        <span className="text-zinc-500">, [])</span>
      </div>

      {/* Line 3: Return */}
      <div className="pl-3 mt-1">
        <span className="text-purple-400">return</span> <span className="text-zinc-500">(</span>
      </div>

      {/* Line 4: Component Opening */}
      <div className="pl-6 group">
        <span className="text-zinc-500">&lt;</span>
        <span className="text-yellow-200">Profile</span>
      </div>

      {/* Line 5: Prop 1 */}
      <div className="pl-9 group">
        <span className="text-sky-300">verified</span>
        <span className="text-zinc-500">=</span>
        <span className="text-zinc-500">{"{"}</span>
        <span className="text-purple-400">true</span>
        <span className="text-zinc-500">{"}"}</span>
      </div>

      {/* Line 6: Prop 2 */}
      <div className="pl-9 group">
        <span className="text-sky-300">stack</span>
        <span className="text-zinc-500">=</span>
        <span className="text-zinc-500">{"{["}</span>
        <span className="text-emerald-400">"NextJS"</span>
        <span className="text-zinc-500">,</span> <span className="text-emerald-400">"TS"</span>
        <span className="text-zinc-500">{"]}"}</span>
      </div>

      {/* Line 7: Component Closing */}
      <div className="pl-6">
        <span className="text-zinc-500">/&gt;</span>
      </div>

      {/* Line 8: Close Return */}
      <div className="pl-3">
        <span className="text-zinc-500">)</span>
      </div>

      {/* Line 9: Close Function */}
      <div className="text-zinc-500">
        {"}"}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-1.5 h-3 bg-zinc-500 ml-1 align-middle"
        />
      </div>
    </motion.div>
  )
}

export const NetworkNodes = () => {
  const [speed, setSpeed] = useState(20)

  return (
    <div
      className="absolute inset-0 flex items-center justify-center -translate-y-4 py-44"
      onMouseEnter={() => setSpeed(5)}
      onMouseLeave={() => setSpeed(20)}
    >
      <div className="relative w-40 h-40">
        <div className="absolute inset-0 rounded-full border border-zinc-800/60" />
        <div className="absolute inset-8 rounded-full border border-zinc-800/40 border-dashed animate-[spin_60s_linear_infinite]" />

        {/* Central Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20 relative" />
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
        </div>

        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-zinc-500 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
          <div className="absolute top-0 left-1/2 h-1/2 w-px bg-linear-to-b from-zinc-800 via-zinc-800/50 to-transparent origin-bottom" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 right-0 bg-zinc-900/90 border border-zinc-800 px-2 py-0.5 rounded flex items-center gap-1.5">
        <div className="h-1 w-1 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-[8px]  text-zinc-500 uppercase tracking-widest">Live</span>
      </div>
    </div>
  )
}

export const SecurityHash = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="absolute inset-0 flex items-center justify-center -translate-y-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(black,transparent_70%)]" />

      <div className="relative z-10">
        <motion.div
          className="flex items-center gap-2 bg-black border border-zinc-800 px-3 py-2 rounded-md shadow-2xl"
          animate={{
            borderColor: isHovered ? "rgba(16, 185, 129, 0.3)" : "rgba(39, 39, 42, 1)",
          }}
        >
          <IconLock className="w-3 h-3 text-zinc-500" />
          <div className="flex gap-1">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full"
                animate={{
                  backgroundColor: isHovered ? "#10b981" : "#3f3f46",
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
