"use client"

import React, { useEffect, useRef, useState } from "react"
import { animate } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/core/theme-toggle"
import Link from "next/link"

export interface NavItem {
  label: string
  href: string
}

export interface SpotlightNavbarProps {
  items?: NavItem[]
  className?: string
  onItemClick?: (item: NavItem, index: number) => void
  defaultActiveIndex?: number
}

export function SpotlightNavbar({
  items = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Discover", href: "#discover" },
    { label: "Pricing", href: "#pricing" },
    { label: "Login", href: "/signin" },
  ],
  className,
  onItemClick,
  defaultActiveIndex = 0,
}: SpotlightNavbarProps) {
  const navRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)
  const [hoverX, setHoverX] = useState<number | null>(null)
  const [isDark, setIsDark] = useState(false)

  const spotlightX = useRef(0)
  const ambienceX = useRef(0)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    const nav = navRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect()
      const x = e.clientX - rect.left
      setHoverX(x)
      spotlightX.current = x
      nav.style.setProperty("--spotlight-x", `${x}px`)
    }

    const handleMouseLeave = () => {
      setHoverX(null)
      const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`)
      if (activeItem) {
        const navRect = nav.getBoundingClientRect()
        const itemRect = activeItem.getBoundingClientRect()
        const targetX = itemRect.left - navRect.left + itemRect.width / 2

        animate(spotlightX.current, targetX, {
          type: "spring",
          stiffness: 200,
          damping: 20,
          onUpdate: v => {
            spotlightX.current = v
            nav.style.setProperty("--spotlight-x", `${v}px`)
          },
        })
      }
    }

    nav.addEventListener("mousemove", handleMouseMove)
    nav.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove)
      nav.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [activeIndex])

  useEffect(() => {
    if (!navRef.current) return
    const nav = navRef.current
    const activeItem = nav.querySelector(`[data-index="${activeIndex}"]`)

    if (activeItem) {
      const navRect = nav.getBoundingClientRect()
      const itemRect = activeItem.getBoundingClientRect()
      const targetX = itemRect.left - navRect.left + itemRect.width / 2

      animate(ambienceX.current, targetX, {
        type: "spring",
        stiffness: 200,
        damping: 20,
        onUpdate: v => {
          ambienceX.current = v
          nav.style.setProperty("--ambience-x", `${v}px`)
        },
      })
    }
  }, [activeIndex])

  const handleItemClick = (item: NavItem, index: number) => {
    setActiveIndex(index)
    onItemClick?.(item, index)
  }

  return (
    <div className={cn("relative flex justify-center pt-6 sm:pt-10 px-2 sm:px-0", className)}>
      <nav
        ref={navRef}
        className={cn(
          "relative h-11 sm:h-12 rounded-full transition-all duration-300 overflow-x-auto overflow-y-hidden bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-black/10 dark:border-white/10 scrollbar-hide max-w-full"
        )}
        style={
          {
            "--spotlight-color": isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)",
            "--ambience-color": isDark ? "rgba(255,255,255,1)" : "rgba(0,0,0,0.8)",
          } as React.CSSProperties
        }
      >
        <ul className="relative flex items-center h-full px-1.5 sm:px-3 gap-0 z-[10] whitespace-nowrap">
          {items.map((item, idx) => (
            <li key={idx} className="relative h-full flex items-center justify-center">
              {item.label === "Login" ? (
                <div onMouseMove={e => e.stopPropagation()}>
                  <Link href={item.href}>
                    <Button
                      size="sm"
                      className="mx-1 sm:mx-2 relative z-20 shadow-none text-xs sm:text-sm px-2 sm:px-4"
                    >
                      {item.label}
                    </Button>
                  </Link>
                </div>
              ) : (
                <a
                  href={item.href}
                  data-index={idx}
                  onClick={e => {
                    e.preventDefault()
                    handleItemClick(item, idx)
                  }}
                  className={cn(
                    "px-2 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors duration-200 rounded-full",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:focus-visible:ring-white/30",
                    activeIndex === idx
                      ? "text-black dark:text-white"
                      : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                  )}
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
          <li className="relative h-full flex items-center justify-center ml-0 sm:ml-1">
            <div
              className="relative z-20 [&_button]:shadow-none scale-75 sm:scale-100"
              onMouseMove={e => e.stopPropagation()}
            >
              <ThemeToggle />
            </div>
          </li>
        </ul>

        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-1 opacity-0 transition-opacity duration-300"
          style={{
            opacity: hoverX !== null ? 1 : 0,
            background: `
              radial-gradient(
                120px circle at var(--spotlight-x) 100%, 
                var(--spotlight-color, rgba(0,0,0,0.1)) 0%, 
                transparent 50%
              )
            `,
          }}
        />

        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px] z-[2]"
          style={{
            background: `
                  radial-gradient(
                    60px circle at var(--ambience-x) 0%, 
                    var(--ambience-color, rgba(0,0,0,1)) 0%, 
                    transparent 100%
                  )
                `,
          }}
        />
      </nav>
    </div>
  )
}
