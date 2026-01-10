"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { AnimatedTooltip } from "../ui/animated-tooltip"
import { Button } from "@/components/ui/button"
import { IconChevronRight, IconCode } from "@tabler/icons-react"
import { SchematicBackground } from "@/components/semantic-background"

export default function HeroSection() {
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

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-transparent">
      <SchematicBackground />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 min-h-[90vh] flex flex-col items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="text-center max-w-5xl mx-auto mb-6"
        >
          <h1 className="text-md sm:text-7xl md:text-8xl font-bold tracking-tighter text-white mb-4">
            Stop Resumes. <br className="hidden md:block" />
            <span className="text-zinc-500">Hire Skill.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm font-medium sm:text-xl text-zinc-400/80 max-w-2xl mx-auto text-center leading-relaxed mb-10"
        >
          Replace subjective hiring with cryptographic proof of skill. AI-driven assessments that
          parse logic, not keywords.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16"
        >
          <Link href="#DiscoverProfile" className="w-full sm:w-auto">
            <Button className="py-4 px-4">
              <IconCode className="w-4 h-4" />
              <span>Analyze Repository</span>
            </Button>
          </Link>

          <Link href="#DiscoverProfile" className="w-full sm:w-auto">
            <Button className="py-4">
              <span>View Leaderboard</span>
              <IconChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center justify-center -space-x-4">
            <AnimatedTooltip items={people} />
          </div>
          <p className="text-xs text-zinc-600 tracking-widest">Trusted by 100+ Engineering Teams</p>
        </motion.div>
      </div>
    </section>
  )
}
