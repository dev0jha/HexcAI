"use client"

import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

class Particle {
  x: number = 0
  y: number = 0
  speed: number = 0
  opacity: number = 1
  fadeDelay: number = 0
  fadeStart: number = 0
  fadingOut: boolean = false
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.ctx = ctx
    this.reset()
    this.y = Math.random() * canvas.height
    this.fadeDelay = Math.random() * 600 + 100
    this.fadeStart = Date.now() + this.fadeDelay
    this.fadingOut = false
  }

  reset() {
    this.x = Math.random() * this.canvas.width
    this.y = Math.random() * this.canvas.height
    this.speed = Math.random() / 5 + 0.1
    this.opacity = 1
    this.fadeDelay = Math.random() * 600 + 100
    this.fadeStart = Date.now() + this.fadeDelay
    this.fadingOut = false
  }

  update() {
    this.y -= this.speed
    if (this.y < 0) {
      this.reset()
    }

    if (!this.fadingOut && Date.now() > this.fadeStart) {
      this.fadingOut = true
    }

    if (this.fadingOut) {
      this.opacity -= 0.008
      if (this.opacity <= 0) {
        this.reset()
      }
    }
  }

  draw(isDark: boolean) {
    let brightness
    if (isDark) {
      // White/Grey particles for Dark Mode
      brightness = Math.random() * 100 + 155
      this.ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${this.opacity})`
    } else {
      // Grey/Black particles for Light Mode
      brightness = Math.random() * 80
      this.ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${this.opacity})`
    }

    this.ctx.fillRect(this.x, this.y, 0.4, Math.random() * 2 + 1)
  }
}

export const NeutralHeroBackground = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let particleCount = 0

    const calculateParticleCount = () => {
      return Math.floor((window.innerWidth * window.innerHeight) / 6000)
    }

    const initParticles = () => {
      particleCount = calculateParticleCount()
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas, ctx))
      }
    }

    const animate = () => {
      // Check for dark mode via class on html or body
      const isDarkMode = document.documentElement.classList.contains("dark")

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(particle => {
        particle.update()
        particle.draw(isDarkMode)
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    window.addEventListener("resize", onResize)

    // Initial setup
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initParticles()
    animate()

    return () => {
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none select-none", className)}
    >
      {/* Background Colors */}
      <div className="absolute inset-0 bg-white dark:bg-black -z-10 transition-colors duration-300" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-gray-100/50 via-white to-white dark:from-zinc-900/20 dark:via-black dark:to-black -z-10 transition-colors duration-300" />

      {/* Spotlight */}
      <div className="spotlight">
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
    </div>
  )
}
