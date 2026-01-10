import { CornerCrosses } from "@/components/corner-corsses"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { ComponentPropsWithoutRef, ReactNode } from "react"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

export interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
}

export const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn("grid w-full grid-cols-1 md:grid-cols-6 gap-4 md:gap-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative flex flex-col justify-between overflow-visible border-dashed",
      "bg-black border border-zinc-800",
      className
    )}
    {...props}
  >
    <CornerCrosses />

    <div className="relative overflow-hidden w-full h-full rounded-xl">
      <div className="absolute inset-0 h-[60%] w-full overflow-hidden">{background}</div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-linear-to-t from-black via-black to-transparent pt-12">
        <div className="mb-2 flex items-center gap-2">
          <div className="p-1 rounded bg-zinc-900 border border-zinc-800">
            <Icon className="h-3 w-3 text-zinc-400" />
          </div>
          <span className="text-[10px] font-mono font-medium text-zinc-500 uppercase tracking-wider">
            SYSTEM_METRIC
          </span>
        </div>

        <div className="transform-gpu transition-all duration-300 group-hover:-translate-y-2">
          <h3 className="text-lg font-semibold text-zinc-100 mb-1 tracking-tight">{name}</h3>
          <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">{description}</p>
        </div>

        <div className="absolute bottom-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-full"
          >
            <Link href={href}>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
)
