import { Navbar } from "@/components/core/Navbar"
import HeroSection from "@/components/core/Hero"
import { HowItWorks } from "@/components/core/HowItWork"
import Container from "@/components/core/Container"
import { SchematicBackground } from "@/components/semantic-background"
import { FeaturesSection } from "@/components/core/Features"

export default function page() {
  return (
    <>
      <main className="relative bg-black">
        <SchematicBackground />
          <Container>
          <Navbar />
          <HeroSection />
          <HowItWorks />
          <FeaturesSection />
         </Container>
      </main>
    </>
  )
}
