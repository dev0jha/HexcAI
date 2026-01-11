"use client"
import { BentoCard, BentoCardProps } from "@/components/ui/bento-grid"
const NoIcon = () => null

const baseCardClass =
  "col-span-1 min-h-[140px] border border-dashed border-zinc-800/60 bg-linear-to-t from-black via-black to-transparent backdrop-blur-sm text-white [&_p]:text-zinc-400"

const developerFeatures: BentoCardProps[] = [
  {
    name: "AI Code Analysis",
    description: "Get detailed feedback on code quality, architecture, and best practices from our AI.",
    href: "#",
    cta: "Learn More",
    className: baseCardClass,
    Icon: NoIcon,
    background: null,
  },
  {
    name: "Visibility Control",
    description: "Choose when to be visible to recruiters. Your privacy, your control.",
    href: "#",
    cta: "Manage Privacy",
    className: baseCardClass,
    Icon: NoIcon,
    background: null,
  },
  {
    name: "Contact Requests",
    description: "Review and approve contact requests from recruiters before sharing your info.",
    href: "#",
    cta: "View Requests",
    className: baseCardClass,
    Icon: NoIcon,
    background: null,
  },
]

const recruiterFeatures: BentoCardProps[] = [
  {
    name: "Discover Talent",
    description: "Find developers based on real code quality, not just keywords on a resume.",
    href: "#",
    cta: "Start Searching",
    className: baseCardClass,
    Icon: NoIcon,
    background: null,
  },
  {
    name: "Verified Skills",
    description: "Each developer's score is based on actual GitHub project analysis.",
    href: "#",
    cta: "See Profiles",
    className: baseCardClass,
    Icon: NoIcon,
    background: null,
  },
  {
    name: "Ethical Contact",
    description: "Only connect with developers who have opted in and approved your request.",
    href: "#",
    cta: "Contact Policy",
    className: baseCardClass,
    Icon: NoIcon,
    background: null,
  },
]

export function FeaturesSection() {
  return (
    <section className="relative w-full bg-black py-24 lg:py-32 border-t border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl  font-semibold text-white mb-8 tracking-tight">
            Feartures <br />
            <span className="text-zinc-600">Showcase your real skills</span>
          </h2>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="text-sm font-medium font-poppins text-success mb-3">For Developers</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              Showcase your real skills
            </h2>
            <p className="text-zinc-400 mb-10">
              No more resume games. Let your code speak for itself and connect with opportunities that match your abilities.
            </p>
            <div className="space-y-4">
              {developerFeatures.map((feature, idx) => (
                <BentoCard key={idx} {...feature} />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium font-poppins text-success mb-3">For Recruiters</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              Find proven talent
            </h2>
            <p className="text-zinc-400 mb-10">
              Skip the guesswork. Discover developers with verified technical skills through their actual code contributions.
            </p>
            <div className="space-y-4">
              {recruiterFeatures.map((feature, idx) => (
                <BentoCard key={idx} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
