import { Navbar } from "@/components/core/Navbar"
import HeroSection from "@/components/core/Hero"
import { HowItWorks } from "@/components/core/HowItWork"
import Container from "@/components/core/Container"
import { SchematicBackground } from "@/components/semantic-background"

export default function page() {
  return (
    <>
      <main className="relative bg-black">
        <SchematicBackground />
        <Container>
          <Navbar />
          <HeroSection />
          <HowItWorks />
        </Container>
      </main>
    </>
  )
}
