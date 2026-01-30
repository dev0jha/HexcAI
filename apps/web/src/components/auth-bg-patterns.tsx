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
        stroke="#3f3f46"
        strokeWidth="1.5"
        fill="none"
        className={className}
      />

      <motion.path
        d={d}
        stroke="white"
        strokeWidth="2"
        strokeLinecap="square"
        fill="none"
        initial={{
          strokeDasharray: "20 1000",
          strokeDashoffset: 1020,
          opacity: 0,
        }}
        animate={{
          strokeDashoffset: -1020,
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          repeatDelay: Math.random() * 2 + 3,
          delay: delay + 1.5,
          ease: "linear",
        }}
        style={{
          filter: "drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.5))",
        }}
      />
    </>
  );
};

const Crosshair = ({
  x,
  y,
  delay,
}: {
  x: number;
  y: number;
  delay: number;
}) => (
  <motion.g
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.4 }}
    transition={{ duration: 1, delay }}
    transform={`translate(${x}, ${y})`}
  >
    <path d="M-5 0 H5 M0 -5 V5" stroke="#52525b" strokeWidth="1" />
  </motion.g>
);

export const AuthBackgroundsPatterns = () => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-60 md:opacity-80">
        <svg
          className="h-full w-full min-w-200"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <ElectricLine d="M0 100 H200 V300 H450" delay={0} duration={6} />
          <ElectricLine d="M100 0 V150 H300 V250" delay={0.5} duration={5} />

          <ElectricLine
            d="M1440 800 H1240 V600 H990"
            delay={0.2}
            duration={6}
          />
          <ElectricLine
            d="M1340 900 V750 H1140 V650"
            delay={0.7}
            duration={5}
          />

          <Crosshair x={200} y={300} delay={1} />
          <Crosshair x={1240} y={600} delay={1.2} />
          <Crosshair x={100} y={800} delay={1.5} />
          <Crosshair x={1340} y={100} delay={1.7} />

          <g transform="translate(1300, 400)">
            <motion.rect
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              x="0"
              y="0"
              width="4"
              height="4"
              fill="#52525b"
            />
            <motion.rect
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              x="0"
              y="10"
              width="4"
              height="4"
              fill="#52525b"
            />
            <motion.rect
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              x="0"
              y="20"
              width="4"
              height="4"
              fill="#52525b"
            />
            <rect
              x="-10"
              y="-5"
              width="30"
              height="40"
              stroke="#27272a"
              strokeWidth="1"
              fill="none"
            />
          </g>
        </svg>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#000_100%)] opacity-100" />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};
