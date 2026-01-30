"use client";

import { Cpu, FileCode, Network, Shield, Terminal } from "lucide-react";

import { GitHubAnalysisFlow } from "@/components/core/GitHubAnalysisFlow";
import {
  BentoCard,
  BentoCardProps,
  BentoGrid,
} from "@/components/ui/bento-grid";
import {
  DevIdCardSkeleton,
  NetworkNodes,
  SecurityHash,
  SystemLogs,
} from "@/components/ui/bento-seletons";

const features: BentoCardProps[] = [
  {
    name: "AI Analysis Engine",
    description:
      "Deep semantic understanding of your codebase structure and logic flows.",
    href: "#",
    cta: "View Logic",
    className: "col-span-1 md:col-span-6 lg:col-span-4 min-h-[300px]",
    Icon: Cpu,
    background: (
      <div className="absolute inset-0 flex -translate-y-8 items-center justify-center py-44 opacity-40 contrast-125 grayscale transition-opacity duration-500 group-hover:opacity-60">
        <GitHubAnalysisFlow />
      </div>
    ),
  },
  {
    name: "Live Audit Logs",
    description: "Real-time transparency into how your data is processed.",
    href: "#",
    cta: "Full Log",
    className: "col-span-1 md:col-span-6 lg:col-span-2 min-h-[300px]",
    Icon: Terminal,
    background: <SystemLogs />,
  },
  {
    name: "Developer Identity",
    description: "A cryptographic proof of your engineering skills.",
    href: "#",
    cta: "View JSON",
    className: "col-span-1 md:col-span-3 lg:col-span-2 min-h-[300px]",
    Icon: FileCode,
    background: <DevIdCardSkeleton />,
  },
  {
    name: "Network Graph",
    description: "Visualize who is viewing your profile in real-time.",
    href: "#",
    cta: "Open Graph",
    className: "col-span-1 md:col-span-3 lg:col-span-2 min-h-[300px]",
    Icon: Network,
    background: <NetworkNodes />,
  },
  {
    name: "Encryption",
    description:
      "One-way hashing ensures your raw data never leaves the vault.",
    href: "#",
    cta: "Read Policy",
    className: "col-span-1 md:col-span-6 lg:col-span-2 min-h-[300px]",
    Icon: Shield,
    background: <SecurityHash />,
  },
];

export function HowItWorks() {
  return (
    <section className="relative w-full border-t border-zinc-900 bg-black py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="mb-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Built for precision. <br />
            <span className="text-zinc-600">Designed for privacy.</span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-400">
            HireXAI operates on a zero-knowledge architecture. We analyze code
            patterns without storing proprietary logic, converting your skills
            into verifiable hashes.
          </p>
        </div>

        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
