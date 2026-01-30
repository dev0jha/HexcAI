"use client";

import { useState } from "react";

import { IconLock } from "@tabler/icons-react";
import { CheckCircle2, CircleDashed } from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { useClientOnly } from "@/hooks/use-clientonly";
import { cn } from "@/lib/utils";

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
];

export const SystemLogs = () => {
  return (
    <div className="relative h-full w-full overflow-hidden p-6 text-[10px] leading-relaxed select-none md:text-xs">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[24px_24px]" />

      <div className="relative z-10 mb-4 flex items-center gap-2 text-zinc-500">
        <Badge className="border-emerald-gray/10 broder-dashed border bg-black p-3 text-xs font-semibold tracking-widest text-neutral-50/80">
          Live Stream
        </Badge>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          </span>
        </div>
      </div>

      <div className="relative z-10 ml-1 space-y-0 border-l border-zinc-800/50">
        {logs.map((log, i) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className="group relative pb-4 pl-6 last:pb-0"
          >
            <div
              className={`absolute top-1.5 -left-1.25 z-20 h-2.5 w-2.5 rounded-full border-2 border-black ${
                log.status === "processing"
                  ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                  : "bg-emerald-500/20"
              }`}
            >
              {log.status === "success" && (
                <div className="absolute inset-0 scale-50 rounded-full bg-emerald-500" />
              )}
              {log.status === "processing" && (
                <div className="absolute inset-0 animate-pulse rounded-full bg-blue-400" />
              )}
            </div>

            {/* Log Content */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                      log.method === "POST"
                        ? "border border-purple-500/20 bg-purple-500/10 text-purple-400"
                        : log.method === "GET"
                          ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                          : "border border-blue-500/20 bg-blue-500/10 text-blue-400"
                    }`}
                  >
                    {log.method}
                  </span>
                  <span className="text-zinc-300 transition-colors group-hover:text-white">
                    {log.endpoint}
                  </span>
                </div>
                <span className="text-zinc-600">{log.duration}</span>
              </div>

              <div className="flex items-center gap-2 pl-0.5 text-zinc-500">
                {log.status === "processing" ? (
                  <CircleDashed className="h-3 w-3 animate-spin text-blue-400" />
                ) : (
                  <CheckCircle2 className="h-3 w-3 text-zinc-600 transition-colors group-hover:text-emerald-500" />
                )}
                <span>{log.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-20 h-16 bg-linear-to-t from-black via-black/80 to-transparent" />
    </div>
  );
};

export const DevIdCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative h-55 w-full max-w-87.5 overflow-hidden",
        "border border-zinc-800 bg-black",
        "before:absolute before:inset-0 before:bg-linear-to-tr before:from-zinc-900/50 before:via-transparent before:to-zinc-900/50 before:opacity-50",
        className
      )}
    >
      <motion.div
        className="absolute inset-0 z-10 h-2.5 w-full bg-linear-to-b from-transparent via-white/5 to-transparent"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-0 flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between">
          <div className="relative flex h-8 w-10 items-center justify-center overflow-hidden rounded border border-zinc-700 bg-zinc-900/50">
            <div className="absolute inset-0 animate-[shimmer_3s_infinite] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-size-[250%_250%,100%_100%]" />
            <div className="grid grid-cols-2 gap-1">
              <div className="h-1 w-1 rounded-full bg-zinc-600" />
              <div className="h-1 w-1 rounded-full bg-zinc-600" />
              <div className="h-1 w-1 rounded-full bg-zinc-600" />
              <div className="h-1 w-1 rounded-full bg-zinc-600" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-1.5 w-12 animate-pulse rounded-full bg-zinc-800" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-zinc-800" />
          </div>
        </div>

        <div className="mt-2 flex items-center gap-4">
          <div className="relative">
            <div className="h-14 w-14 overflow-hidden rounded-full border border-zinc-800 bg-zinc-900">
              <div className="absolute inset-0 animate-pulse bg-zinc-800" />
            </div>
            <div className="absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black">
              <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-zinc-700" />
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/4 animate-pulse rounded bg-zinc-800" />
            <div className="h-2 w-1/2 animate-pulse rounded bg-zinc-900" />
          </div>
        </div>

        <div className="mt-2 space-y-3">
          <div className="flex gap-2">
            <div className="h-5 w-12 animate-pulse rounded-md border border-zinc-800 bg-zinc-900" />
            <div className="h-5 w-16 animate-pulse rounded-md border border-zinc-800 bg-zinc-900" />
            <div className="h-5 w-10 animate-pulse rounded-md border border-zinc-800 bg-zinc-900" />
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-zinc-900 pt-4 opacity-50">
          <Placeholder />
          <div className="h-2 w-20 animate-pulse rounded bg-zinc-900" />
        </div>
      </div>

      <div className="absolute top-0 left-0 h-2 w-2 border-t border-l border-zinc-700" />
      <div className="absolute top-0 right-0 h-2 w-2 border-t border-r border-zinc-700" />
      <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-zinc-700" />
      <div className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-zinc-700" />
    </div>
  );
};

export const ReactProfile = () => {
  return (
    <motion.div
      className="pointer-events-none h-full w-full p-5 text-[10px] leading-relaxed select-none"
      whileHover={{ scale: 1.02, x: 5 }}
    >
      <div className="mb-3 flex items-center gap-2 text-zinc-600 italic">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-500"></span>
        {"// User.tsx"}
      </div>

      {/* Line 1: Definition */}
      <div className="group">
        <span className="text-purple-400">const</span>{" "}
        <span className="text-yellow-200">Engineer</span>{" "}
        <span className="text-zinc-500">=</span>{" "}
        <span className="text-zinc-500">{"({"}</span>{" "}
        <span className="text-sky-300">skills</span>{" "}
        <span className="text-zinc-500">{"})"}</span>{" "}
        <span className="text-purple-400">=&gt;</span>{" "}
        <span className="text-zinc-500">{"{"}</span>
      </div>

      {/* Line 2: Hook */}
      <div className="group pl-3 opacity-80">
        <span className="text-purple-400">const</span>{" "}
        <span className="text-zinc-300">rank</span>{" "}
        <span className="text-zinc-500">=</span>{" "}
        <span className="text-blue-400">useMemo</span>
        <span className="text-zinc-500">(()</span>{" "}
        <span className="text-purple-400">=&gt;</span>{" "}
        <span className="text-emerald-400">"Top 1%"</span>
        <span className="text-zinc-500">, [])</span>
      </div>

      {/* Line 3: Return */}
      <div className="mt-1 pl-3">
        <span className="text-purple-400">return</span>{" "}
        <span className="text-zinc-500">(</span>
      </div>

      {/* Line 4: Component Opening */}
      <div className="group pl-6">
        <span className="text-zinc-500">&lt;</span>
        <span className="text-yellow-200">Profile</span>
      </div>

      {/* Line 5: Prop 1 */}
      <div className="group pl-9">
        <span className="text-sky-300">verified</span>
        <span className="text-zinc-500">=</span>
        <span className="text-zinc-500">{"{"}</span>
        <span className="text-purple-400">true</span>
        <span className="text-zinc-500">{"}"}</span>
      </div>

      {/* Line 6: Prop 2 */}
      <div className="group pl-9">
        <span className="text-sky-300">stack</span>
        <span className="text-zinc-500">=</span>
        <span className="text-zinc-500">{"{["}</span>
        <span className="text-emerald-400">"NextJS"</span>
        <span className="text-zinc-500">,</span>{" "}
        <span className="text-emerald-400">"TS"</span>
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
          className="ml-1 inline-block h-3 w-1.5 bg-zinc-500 align-middle"
        />
      </div>
    </motion.div>
  );
};

export const NetworkNodes = () => {
  const [speed, setSpeed] = useState(20);

  return (
    <div
      className="absolute inset-0 flex -translate-y-4 items-center justify-center py-44"
      onMouseEnter={() => setSpeed(5)}
      onMouseLeave={() => setSpeed(20)}
    >
      <div className="relative h-40 w-40">
        <div className="absolute inset-0 rounded-full border border-zinc-800/60" />
        <div className="absolute inset-8 animate-[spin_60s_linear_infinite] rounded-full border border-dashed border-zinc-800/40" />

        {/* Central Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative z-20 h-2 w-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          <div className="absolute inset-0 animate-ping rounded-full bg-white/20" />
        </div>

        <motion.div
          className="absolute top-0 left-0 h-full w-full"
          animate={{ rotate: 360 }}
          transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-zinc-500 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
          <div className="absolute top-0 left-1/2 h-1/2 w-px origin-bottom bg-linear-to-b from-zinc-800 via-zinc-800/50 to-transparent" />
        </motion.div>
      </div>

      <div className="absolute right-0 bottom-0 flex items-center gap-1.5 rounded border border-zinc-800 bg-zinc-900/90 px-2 py-0.5">
        <div className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
        <span className="text-[8px] tracking-widest text-zinc-500 uppercase">
          Live
        </span>
      </div>
    </div>
  );
};

export const SecurityHash = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute inset-0 flex -translate-y-4 items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] mask-[radial-gradient(black,transparent_70%)] bg-size-[16px_16px]" />

      <div className="relative z-10">
        <motion.div
          className="flex items-center gap-2 rounded-md border border-zinc-800 bg-black px-3 py-2 shadow-2xl"
          animate={{
            borderColor: isHovered
              ? "rgba(16, 185, 129, 0.3)"
              : "rgba(39, 39, 42, 1)",
          }}
        >
          <IconLock className="h-3 w-3 text-zinc-500" />
          <div className="flex gap-1">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="h-1 w-1 rounded-full"
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
  );
};

function Placeholder() {
  const { isHyderated } = useClientOnly();
  if (!isHyderated) {
    return null;
  }
  return (
    <div className="flex h-4 items-end gap-0.5">
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
  );
}
