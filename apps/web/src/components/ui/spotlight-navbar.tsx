"use client"

import React, { useEffect, useRef, useState } from "react"
import { animate } from "motion/react"
import { cn } from "@/lib/utils"
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

  const spotlightX = useRef(0)
  const ambienceX = useRef(0)

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
    <div className={cn("fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4", className)}>
      <nav
        ref={navRef}
        className={cn(
          "relative h-14 max-w-1/2 transition-all duration-300 py-4",
          "bg-black/90 backdrop-blur-md border-2 border-zinc-800/40  border-dashed",
          "overflow-hidden max-w-full rounded-lg"
        )}
        style={
          {
            "--spotlight-color": "rgba(255, 255, 255, 0.08)",
            "--ambience-color": "#ffffff",
          } as React.CSSProperties
        }
      >
        <ul className="relative flex items-center h-full px-2 gap-1 z-10 whitespace-nowrap">
          {items.map((item, idx) => (
            <li key={idx} className="relative h-full flex items-center justify-center">
              {item.label === "Login" ? (
                <div onMouseMove={e => e.stopPropagation()} className="ml-2 mr-1">
                  <Link href={item.href}>
                    <button
                      className={cn(
                        "relative z-20 flex items-center justify-center px-4 py-1.5",
                        "text-xs sm:text-sm font-medium rounded-md transition-colors",
                        "bg-white text-black hover:bg-zinc-200"
                      )}
                    >
                      {item.label}
                    </button>
                  </Link>
                </div>
              ) : (
                <Link
                  href={item.href}
                  data-index={idx}
                  onClick={e => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault()
                      handleItemClick(item, idx)
                    } else {
                      handleItemClick(item, idx)
                    }
                  }}
                  className={cn(
                    "px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 rounded-full",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500",
                    activeIndex === idx ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-full z-1 transition-opacity duration-300"
          style={{
            opacity: hoverX !== null ? 1 : 0,
            background: `
              radial-gradient(
                100px circle at var(--spotlight-x) 100%, 
                var(--spotlight-color) 0%, 
                transparent 50%
              )
            `,
          }}
        />

        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-px z-2"
          style={{
            background: `
                  radial-gradient(
                    40px circle at var(--ambience-x) 0%, 
                    var(--ambience-color) 0%, 
                    transparent 100%
                  )
                `,
          }}
        />
      </nav>
    </div>
  )
}
