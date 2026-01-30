"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const ElectricLine = ({
  d,
  delay = 0,
  duration = 4,
  className,
}: {
  d: string;
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  return (
    <>
      <motion.path
        d={d}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay, ease: "easeInOut" }}
        stroke="#27272a"
        strokeWidth="1.5"
        fill="none"
        className={className}
      />

      <motion.path
        d={d}
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{
          strokeDasharray: "10 2000",
          strokeDashoffset: 2010,
          opacity: 0,
        }}
        animate={{
          strokeDashoffset: -2010,
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          repeatDelay: Math.random() * 3 + 2,
          delay: delay + 1.5,
          ease: "linear",
        }}
        style={{
          filter: "drop-shadow(0px 0px 4px rgba(168, 85, 247, 0.8))",
        }}
      />
    </>
  );
};

export const SchematicBackground = () => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      )}
    >
      <div className="absolute inset-0" />

      <div className="absolute inset-0 flex items-center justify-center opacity-40 md:opacity-70">
        <svg
          className="h-full w-full min-w-250"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern
              id="diagonalHatch"
              patternUnits="userSpaceOnUse"
              width="8"
              height="8"
            >
              <path
                d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4"
                stroke="#27272a"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <g transform="translate(100, 50)">
            <ElectricLine d="M-200 0 L400 400 H800" delay={0} duration={5} />

            <ElectricLine
              d="M800 400 L950 550 H1400"
              delay={0.5}
              duration={4}
            />

            <ElectricLine d="M1000 400 L850 550" delay={0.2} duration={6} />

            <ElectricLine
              d="M1000 400 L1200 200 H1400"
              delay={0.2}
              duration={7}
            />

            <motion.rect
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              x="1200"
              y="550"
              width="240"
              height="150"
              fill="url(#diagonalHatch)"
              stroke="#27272a"
              strokeWidth="1.5"
            />

            <g className="opacity-50">
              <rect x="1050" y="300" width="5" height="15" fill="#27272a" />
              <rect x="1060" y="300" width="5" height="15" fill="#27272a" />

              <motion.rect
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                x="1020"
                y="330"
                width="5"
                height="5"
                fill="#27272a"
              />
              <rect x="1030" y="330" width="5" height="5" fill="#27272a" />
              <motion.rect
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                x="1050"
                y="330"
                width="5"
                height="5"
                fill="#27272a"
              />
              <rect x="1060" y="330" width="5" height="5" fill="#27272a" />
            </g>
          </g>
        </svg>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-80" />
    </div>
  );
};
