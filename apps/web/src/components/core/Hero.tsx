"use client";

import Link from "next/link";

import { IconChevronRight, IconCode } from "@tabler/icons-react";
import { motion } from "motion/react";

import { SchematicBackground } from "@/components/semantic-background";
import { Button } from "@/components/ui/button";

import { AnimatedTooltip } from "../ui/animated-tooltip";

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
      image: "https://avatars.githubusercontent.com/u/155317634?v=4",
    },
    {
      id: 3,
      name: "Pallav Rai",
      designation: "Backend Developer",
      image: "https://avatars.githubusercontent.com/u/33592027?v=4",
    },
  ];

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-transparent">
      <SchematicBackground />

      <div className="relative z-10 container mx-auto flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="mx-auto mb-6 max-w-5xl text-center"
        >
          <h1 className="mb-4 text-3xl font-bold tracking-tighter text-white md:text-8xl">
            Stop Resumes. <br className="hidden md:block" />
            <span className="text-zinc-500">Hire Skill.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed font-medium text-zinc-400/80 sm:text-xl"
        >
          Replace subjective hiring with cryptographic proof of skill. AI-driven
          assessments that parse logic, not keywords.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col place-content-center gap-4 py-8 md:flex-row"
        >
          <Link href="#DiscoverProfile">
            <Button className="w-full p-4">
              <IconCode className="h-4 w-4" />
              <span>Analyze Repository</span>
            </Button>
          </Link>

          <Link href="#DiscoverProfile">
            <Button className="w-full p-4">
              <span>View Leaderboard</span>
              <IconChevronRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-white" />
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
          <p className="text-xs tracking-widest text-zinc-600">
            Trusted by 100+ Engineering Teams
          </p>
        </motion.div>
      </div>
    </section>
  );
}
