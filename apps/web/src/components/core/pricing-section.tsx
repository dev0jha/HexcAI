"use client"

import * as PricingCard from "@/components/pricing-card"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/ui/section-header"
import { cn } from "@/lib/utils"
import { Briefcase, Building, CheckCircle2, Users } from "lucide-react"

export function PricingSection() {
   const plans = [
      {
         icon: <Users />,
         description: "For individual developers",
         name: "Developer",
         price: "Free",
         variant: "outline",
         features: [
            "Automated Repository Analysis",
            "Personal Profile Page",
            "Privacy Controls",
            "Basic Code Metrics",
            "5 Repository Analyses/Month",
            "Standard Support",
            "Profile Visibility Toggle",
            "Job Request Inbox",
            "Basic Analytics Dashboard",
         ],
      },
      {
         icon: <Briefcase />,
         description: "For growing recruitment teams",
         name: "Recruiter Pro",
         badge: "Popular",
         price: "$50",
         original: "$120",
         period: "/month",
         variant: "default",
         features: [
            "Advanced Candidate Search",
            "Unlimited Profile Views",
            "Deep Technical Insights",
            "AI-Powered Skill Matching",
            "Priority Contact Requests",
            "Custom Filters & Tags",
            "Analytics Dashboard",
            "Team Collaboration Tools",
            "Dedicated Support",
         ],
      },
      {
         icon: <Building />,
         name: "Enterprise",
         description: "For large-scale hiring operations",
         price: "$150",
         original: "$300",
         period: "/month",
         variant: "outline",
         features: [
            "All Recruiter Pro Features",
            "Unlimited Team Members",
            "Custom API Access",
            "White-Label Options",
            "Advanced Security & Compliance",
            "Dedicated Account Manager",
            "Custom Integration Support",
            "Priority 24/7 Support",
            "Advanced Audit Logs",
         ],
      },
   ]

   return (
      <section id="pricing" className="relative w-full bg-[#121212] py-24 lg:py-32">
         <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-8">
            <SectionHeader title="Transparent Pricing" subtitle="Built for every scale" />
         </div>

         {/* Pricing Cards Grid */}
         <div className="mx-auto grid w-full max-w-5xl gap-6 px-6 sm:px-0 pt-10 md:grid-cols-3">
            {plans.map((plan, index) => (
               <PricingCard.Card
                  className={cn("w-full max-w-full", index === 1 && "md:scale-105")}
                  key={plan.name}
               >
                  <PricingCard.Header
                     className={cn(
                        "relative z-10",
                        "bg-zinc-900/95 backdrop-blur supports-backdrop-filter:bg-neutral-800/90",
                        "border border-zinc-200/20"
                     )}
                  >
                     <PricingCard.Plan>
                        <PricingCard.PlanName>
                           {plan.icon}
                           <span className="text-muted-foreground">{plan.name}</span>
                        </PricingCard.PlanName>
                        {plan.badge && <PricingCard.Badge>{plan.badge}</PricingCard.Badge>}
                     </PricingCard.Plan>
                     <PricingCard.Price>
                        <PricingCard.MainPrice>{plan.price}</PricingCard.MainPrice>
                        <PricingCard.Period>{plan.period}</PricingCard.Period>
                        {plan.original && (
                           <PricingCard.OriginalPrice className="ml-auto">
                              {plan.original}
                           </PricingCard.OriginalPrice>
                        )}
                     </PricingCard.Price>
                     <Button
                        className={cn("w-full font-semibold")}
                        variant={plan.variant as "outline" | "default"}
                     >
                        Get Started
                     </Button>
                  </PricingCard.Header>

                  <div
                     className={cn(
                        "pointer-events-none absolute inset-0 rounded-[inherit]",
                        "bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.02)_2px,transparent_2px,transparent_6px)]"
                     )}
                  />

                  <PricingCard.Body className={cn("relative overflow-hidden")}>
                     <div className="relative">
                        <PricingCard.Description>{plan.description}</PricingCard.Description>

                        <PricingCard.List>
                           {plan.features.map(item => (
                              <PricingCard.ListItem className="text-xs" key={item}>
                                 <CheckCircle2 className="h-4 w-4 text-foreground" />
                                 <span>{item}</span>
                              </PricingCard.ListItem>
                           ))}
                        </PricingCard.List>
                     </div>
                  </PricingCard.Body>
               </PricingCard.Card>
            ))}
         </div>
      </section>
   )
}
