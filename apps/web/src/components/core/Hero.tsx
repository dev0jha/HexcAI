"use client"
import React from "react"
import Link from "next/link"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { AnimatedTooltip } from "../ui/animated-tooltip"

import AnimatedButton from "@/components/ui/animated-button"
import { NeutralHeroBackground } from "@/components/ui/neutral-hero-background"

export const HeroSection = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const people = [
    {
      id: 1,
      name: "Arpit Yadav",
      designation: "Software Engineer",
      image: "https://avatars.githubusercontent.com/u/118053362?v=4",
    },
    {
      id: 2,
      name: "Dev Hari Ojha",
      designation: "Full Stack Developer",
      image: "https://pbs.twimg.com/profile_images/2007479757957701632/kPeohrWe_400x400.jpg",
    },
    {
      id: 3,
      name: "Pallav Rai",
      designation: "Backend Developer",
      image: "https://avatars.githubusercontent.com/u/33592027?v=4",
    },
  ]

  const springConfig = { damping: 50, stiffness: 100 }
  const parallaxX = useSpring(mouseX, springConfig)
  const parallaxY = useSpring(mouseY, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-300"
      onMouseMove={handleMouseMove}
    >
      {/* Background - Neutral Theme Adapts to Light/Dark */}
      <NeutralHeroBackground className="z-0" />

      {/* Main Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 min-h-screen flex items-center justify-center py-20">
        {/* Center Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="text-center z-30 relative max-w-4xl w-full"
        >
          {/* Badge - Adaptive Zinc/White Monochrome */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-100 mb-6 sm:mb-8 backdrop-blur-sm shadow-sm"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3 text-black dark:text-white"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M3 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17.585 17.587a2 2 0 0 0 2.813 2.843" />
                <path d="M6.5 17.5l5.5 -4.5l5.5 4.5" />
                <path d="M12 7v1m0 4v1" />
                <path d="M3 3l18 18" />
              </svg>
            </motion.div>
            <span className="tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
              HireXAI
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="mb-2 sm:mb-4 px-2"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-poppins font-bold tracking-tighter leading-[1.1] text-transparent bg-clip-text bg-linear-to-b from-zinc-900 via-zinc-800 to-zinc-400 dark:from-white dark:via-white dark:to-zinc-500 drop-shadow-sm">
              Stop Resumes !<br /> Hire Code
            </h1>
            <div className="text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-[1.1] text-black dark:text-white drop-shadow-2xl">
              with precision and speed
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-5 sm:mb-5 font-light px-4"
          >
            Revolutionize your hiring process with AI-driven code assessments that identify top
            talent quickly and accurately.
          </motion.p>
          <div className="flex flex-row items-center justify-center gap-6 mb-10 w-full">
            <AnimatedTooltip items={people} />
            <span className="text-sm sm:text-base font-light text-zinc-600 dark:text-zinc-400">
              +100 developers used
            </span>
          </div>
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="flex justify-center gap-3 sm:gap-4 px-4"
          >
            <Link href="#DiscoverProfile">
              <AnimatedButton className="text-sm sm:text-md px-4 sm:px-8 py-2 sm:py-4">
                Analyze Yourself
              </AnimatedButton>
            </Link>
            <Link href="#DiscoverProfile">
              <AnimatedButton className="text-sm sm:text-md px-4 sm:px-8 py-2 sm:py-4">
                Discover Profiles
              </AnimatedButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
