"use client"
import { GitHubAnalysisFlow } from "@/components/core/GitHubAnalysisFlow"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { Users, Briefcase, CheckCircle, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { useIsMobile } from "@/hooks/use-mobile"

const features = [
  {
    name: "AI-Powered Analysis",
    description: "",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
       <div className="absolute top-0 left-0 right-0 bottom-16 md:bottom-20 flex items-center justify-center px-2 md:px-4">
        <GitHubAnalysisFlow />
      </div>
    ),
  },
]

const PlatformStatsCard = () => {
  const isMobile = useIsMobile()
  const AnimationWrapper = isMobile ? "div" : motion.div

  return (
    <div className="absolute top-0 left-0 right-0 bottom-20 flex items-center justify-center p-4 md:p-8">
      <div className="space-y-4 md:space-y-6 w-full">
        <AnimationWrapper 
          className="flex items-center gap-3 md:gap-4"
          {...(!isMobile && {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }
          })}
        >
          <AnimationWrapper 
            className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-success/20 flex items-center justify-center"
            {...(!isMobile && {
              animate: { scale: [1, 1.1, 1] },
              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            })}
          >
            <span className="text-lg md:text-xl font-bold text-success">94</span>
          </AnimationWrapper>
          <div>
            <p className="font-medium text-foreground text-sm md:text-base">Average Score</p>
            <p className="text-xs md:text-sm text-muted-foreground">Top developers</p>
          </div>
        </AnimationWrapper>
        <AnimationWrapper 
          className="flex items-center gap-3 md:gap-4"
          {...(!isMobile && {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.5, delay: 0.2, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }
          })}
        >
          <AnimationWrapper 
            className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary/20 flex items-center justify-center"
            {...(!isMobile && {
              animate: { scale: [1, 1.1, 1] },
              transition: { duration: 2, delay: 0.3, repeat: Infinity, ease: "easeInOut" }
            })}
          >
            <span className="text-lg md:text-xl font-bold text-primary">100</span>
          </AnimationWrapper>
          <div>
            <p className="font-medium text-foreground text-sm md:text-base">Developers</p>
            <p className="text-xs md:text-sm text-muted-foreground">Analyzed</p>
          </div>
        </AnimationWrapper>
        <AnimationWrapper 
          className="flex items-center gap-3 md:gap-4"
          {...(!isMobile && {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.5, delay: 0.4, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }
          })}
        >
          <AnimationWrapper 
            className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-success/20 flex items-center justify-center"
            {...(!isMobile && {
              animate: { scale: [1, 1.1, 1] },
              transition: { duration: 2, delay: 0.6, repeat: Infinity, ease: "easeInOut" }
            })}
          >
            <span className="text-lg md:text-xl font-bold text-primary">200</span>
          </AnimationWrapper>
          <div>
            <p className="font-medium text-foreground text-sm md:text-base">Repositories</p>
            <p className="text-xs md:text-sm text-muted-foreground">Scanned</p>
          </div>
        </AnimationWrapper>
      </div>
    </div>
  )
}

const DeveloperProfileCard = () => {
  const isMobile = useIsMobile()
  const AnimationWrapper = isMobile ? "div" : motion.div

  return (
    <div className="absolute top-0 left-0 right-0 bottom-20 flex items-center justify-center p-4 md:p-8">
      <div className="w-full">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <AnimationWrapper 
            className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center"
            {...(!isMobile && {
              animate: { rotate: [0, 360] },
              transition: { duration: 20, repeat: Infinity, ease: "linear" }
            })}
          >
            <Users className="h-6 w-6 md:h-7 md:w-7 text-primary-foreground" />
          </AnimationWrapper>
          <div>
            <h3 className="font-semibold text-base md:text-lg text-foreground">Developer Profile</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Showcase your skills</p>
          </div>
        </div>
        <div className="space-y-2 md:space-y-3">
          <AnimationWrapper 
            className="flex items-center gap-2 text-xs md:text-sm text-foreground"
            {...(!isMobile && {
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }
            })}
          >
            <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-success" />
            <span>Verified code quality</span>
          </AnimationWrapper>
          <AnimationWrapper 
            className="flex items-center gap-2 text-xs md:text-sm text-foreground"
            {...(!isMobile && {
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.5, delay: 0.2, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }
            })}
          >
            <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-success" />
            <span>Skill endorsements</span>
          </AnimationWrapper>
          <AnimationWrapper 
            className="flex items-center gap-2 text-xs md:text-sm text-foreground"
            {...(!isMobile && {
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.5, delay: 0.4, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }
            })}
          >
            <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-success" />
            <span>Privacy controls</span>
          </AnimationWrapper>
        </div>
      </div>
    </div>
  )
}

const GetDiscoveredCard = () => {
  const isMobile = useIsMobile()
  const AnimationWrapper = isMobile ? "div" : motion.div

  return (
    <div className="absolute top-0 left-0 right-0 bottom-20 flex items-center justify-center p-4 md:p-8">
      <div className="w-full">
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <AnimationWrapper 
            className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center"
            {...(!isMobile && {
              animate: { 
                boxShadow: [
                  "0 0 0 0 rgba(var(--accent), 0.4)",
                  "0 0 0 10px rgba(var(--accent), 0)",
                  "0 0 0 0 rgba(var(--accent), 0)"
                ]
              },
              transition: { duration: 2, repeat: Infinity }
            })}
          >
            <Briefcase className="h-6 w-6 md:h-7 md:w-7 text-accent-foreground" />
          </AnimationWrapper>
          <div>
            <h3 className="font-semibold text-base md:text-lg text-foreground">Get Discovered</h3>
            <p className="text-xs md:text-sm text-muted-foreground">By top recruiters</p>
          </div>
        </div>
        <div className="space-y-2 md:space-y-3">
          <AnimationWrapper 
            className="flex items-center gap-2 text-xs md:text-sm text-foreground"
            {...(!isMobile && {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }
            })}
          >
            <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-success" />
            <span>Opt-in visibility</span>
          </AnimationWrapper>
          <AnimationWrapper 
            className="flex items-center gap-2 text-xs md:text-sm text-foreground"
            {...(!isMobile && {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.2, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }
            })}
          >
            <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-success" />
            <span>Direct contact requests</span>
          </AnimationWrapper>
          <AnimationWrapper 
            className="flex items-center gap-2 text-xs md:text-sm text-foreground"
            {...(!isMobile && {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.4, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }
            })}
          >
            <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-success" />
            <span>Consent-based hiring</span>
          </AnimationWrapper>
        </div>
      </div>
    </div>
  )
}

const PrivacyFirstCard = () => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-20 flex items-center justify-center p-4 md:p-8">
      <div className="text-center w-full">
        <div className="h-14 w-14 md:h-16 md:w-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 md:mb-6 border border-blue-500/30">
          <Shield className="h-7 w-7 md:h-8 md:w-8 text-blue-500" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-2 md:mb-3">Your Data, Your Control</h3>
        <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4">
          Complete transparency with full control over your profile visibility and data sharing.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="px-2 md:px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-medium border border-blue-500/20">
            End-to-End Encryption
          </span>
          <span className="px-2 md:px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-xs font-medium border border-purple-500/20">
            GDPR Compliant
          </span>
        </div>
      </div>
    </div>
  )
}

features.push(
  {
    name: "Platform Stats",
    description: "",
    href: "#",
    cta: "View Stats",
    className: "col-span-3 lg:col-span-1",
    background: <PlatformStatsCard />,
  },
  {
    name: "Developer Profile",
    description: "",
    href: "#",
    cta: "Create Profile",
    className: "col-span-3 lg:col-span-1",
    background: <DeveloperProfileCard />,
  },
  {
    name: "Get Discovered",
    description: "",
    href: "#",
    cta: "Get Started",
    className: "col-span-3 lg:col-span-1",
    background: <GetDiscoveredCard />,
  },
  {
    name: "Privacy First",
    description: "",
    href: "#",
    cta: "Learn More",
    className: "col-span-3 lg:col-span-1",
    background: <PrivacyFirstCard />,
  }
)

export function HowItWorks() {
  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-poppins mb-3 sm:mb-4">How It Works</h2>
          <p className="text-muted-foreground font-poppins text-base sm:text-lg max-w-2xl mx-auto px-4">
            Discover how HireXAI revolutionizes the hiring process with AI-powered insights
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <BentoGrid>
            {features.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  )
}
