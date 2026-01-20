import { Navbar } from "@/components/core/Navbar"
import HeroSection from "@/components/core/Hero"
import { HowItWorks } from "@/components/core/HowItWork"
import Container from "@/components/core/Container"
import { SchematicBackground } from "@/components/semantic-background"
import { FeaturesSection } from "@/components/core/Features"
import ClientFeedback from "@/components/testimonial"
import Footer from "@/components/layout/footer"
import { cn } from "@/lib/utils"

export default function page() {
  return (
    <>
      <main className="relative bg-black">
        <SchematicBackground />
        <Container>
          <div
            className={cn(
              "pointer-events-none",
              "absolute inset-y-0 left-0",
              "z-10",
              "-translate-x-14",
              "w-10 sm:w-14 h-full",
              "border-r border-[rgba(255,255,255,0.1)]",
              "bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.1)_0px,rgba(255,255,255,0.1)_1px,transparent_1px,transparent_10px)]"
            )}
          />

          <div
            className={cn(
              "pointer-events-none",
              "absolute inset-y-0 right-0",
              "z-10",
              "translate-x-14",
              "w-10 sm:w-14 h-full",
              "border-l border-[rgba(255,255,255,0.1)]",
              "bg-[repeating-linear-gradient(315deg,rgba(255,255,255,0.1)_0px,rgba(255,255,255,0.1)_1px,transparent_1px,transparent_10px)]"
            )}
          />
          <Navbar />
          <HeroSection />
          <HowItWorks />
          <FeaturesSection />
          <ClientFeedback />
          <Footer />
        </Container>
      </main>
    </>
  )
}
