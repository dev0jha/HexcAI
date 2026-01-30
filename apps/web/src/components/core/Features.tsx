"use client";

import React from "react";

import {
  BarChart3,
  GitBranch,
  Inbox,
  Search,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import { PlusIcon } from "@/components/ui/plus-icon";
import { cn } from "@/lib/utils";

interface TechCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  cta: string;
}

function TechCard({ title, description, icon: Icon }: TechCardProps) {
  return (
    <div className="group relative flex flex-col justify-between bg-neutral-900/10 p-6 transition-all hover:bg-zinc-900/40 sm:p-8">
      <div className="pointer-events-none absolute inset-0 border border-dashed border-zinc-800/60" />

      <PlusIcon className="absolute -top-1 -left-1 text-white/50" />
      <PlusIcon className="absolute -top-1 -right-1 text-white/50" />
      <PlusIcon className="absolute -right-1 -bottom-1 text-white/50" />
      <PlusIcon className="absolute -bottom-1 -left-1 text-white/50" />

      <div>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/80 text-zinc-400 transition-colors group-hover:border-zinc-700 group-hover:text-white">
            <Icon size={18} strokeWidth={1.5} />
          </div>
          <h3 className="font-medium text-zinc-100">{title}</h3>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-zinc-500 transition-colors group-hover:text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}

const developerFeatures = [
  {
    title: "Automated Repository Audit",
    description:
      "Get an instant 0-100 score based on code architecture, security practices, and logic patterns. No manual review needed.",
    icon: GitBranch,
    href: "/dashboard/analyze",
    cta: "Analyze Repo",
  },
  {
    title: "Granular Privacy Controls",
    description:
      "Your profile remains invisible by default. Toggle visibility only when you are ready to be discovered.",
    icon: ShieldCheck,
    href: "/dashboard/settings",
    cta: "Manage Visibility",
  },
  {
    title: "Spam-Free Inbox",
    description:
      "Recruiters cannot see your contact details. Review inbound requests and accept only the ones you like.",
    icon: Inbox,
    href: "/dashboard/requests",
    cta: "View Requests",
  },
];

const recruiterFeatures = [
  {
    title: "Skill-Based Search",
    description:
      "Filter candidates by verified technical scores and tech stacks rather than resume keywords or pedigree.",
    icon: Search,
    href: "/recruiter/discover",
    cta: "Browse Talent",
  },
  {
    title: "Deep Technical Insights",
    description:
      "Access detailed breakdowns of a candidate's git activity, documentation habits, and code complexity.",
    icon: BarChart3,
    href: "/recruiter/candidates",
    cta: "View Sample Report",
  },
  {
    title: "High-Intent Messaging",
    description:
      "Connect with developers who have explicitly opted in. Higher response rates, less noise.",
    icon: UserCheck,
    href: "/signup",
    cta: "Start Hiring",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative w-full border-t border-zinc-900 bg-black py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="mb-16 text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Features <br />
          <span className="text-zinc-600">Showcase your real skills</span>
        </h2>

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <div className="mb-8">
              <p className="mb-2 font-mono text-xs tracking-widest text-emerald-500 uppercase">
                For Developers
              </p>
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-white">
                Let your code speak
              </h2>
              <p className="max-w-md text-zinc-400">
                Stop relying on resume formatting. Get evaluated on your actual
                engineering output.
              </p>
            </div>

            <div className="flex flex-col gap-6 border-t border-dashed border-zinc-800/60">
              {developerFeatures.map((feature, idx) => (
                <div key={idx} className={cn(idx !== 0 && "-mt-px")}>
                  <TechCard {...feature} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8">
              <p className="mb-2 font-mono text-xs tracking-widest text-emerald-500 uppercase">
                For Recruiters
              </p>
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-white">
                Find proven talent
              </h2>
              <p className="max-w-md text-zinc-400">
                Eliminate guesswork. Identify developers with verified technical
                abilities.
              </p>
            </div>

            <div className="flex flex-col gap-6 border-t border-dashed border-zinc-800/60">
              {recruiterFeatures.map((feature, idx) => (
                <div key={idx} className={cn(idx !== 0 && "-mt-px")}>
                  <TechCard {...feature} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
