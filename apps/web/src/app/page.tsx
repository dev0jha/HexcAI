import { Navbar } from "@/components/core/Navbar"
import { HeroSection } from "@/components/core/Hero"
import {HowItWorks}  from "@/components/core/HowItWork"

export default function page() {
  return (
    <>
    <main className="relative">
      <Navbar />
      <HeroSection />
      <HowItWorks />
    
    </main>
    </>
  )
}
