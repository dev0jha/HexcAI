import { ComponentPropsWithoutRef, ReactNode } from "react";

import Link from "next/link";

import { ArrowRightIcon } from "lucide-react";

import { CornerCrosses } from "@/components/corner-corsses";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

export interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

export const BentoGrid = ({
  children,
  className,
  ...props
}: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-4 md:grid-cols-6 md:gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

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
      "border border-zinc-800 bg-black",
      className
    )}
    {...props}
  >
    <CornerCrosses />

    <div className="relative h-full w-full overflow-hidden rounded-xl">
      <div className="absolute inset-0 h-[60%] w-full overflow-hidden">
        {background}
      </div>

      <div className="absolute right-0 bottom-0 left-0 z-20 bg-linear-to-t from-black via-black to-transparent p-6 pt-12">
        <div className="mb-2 flex items-center gap-2">
          <div className="rounded border border-zinc-800 bg-zinc-900 p-1">
            <Icon className="h-3 w-3 text-zinc-400" />
          </div>
          <span className="font-mono text-[10px] font-medium tracking-wider text-zinc-500 uppercase">
            SYSTEM_METRIC
          </span>
        </div>

        <div className="transform-gpu transition-all duration-300 group-hover:-translate-y-2">
          <h3 className="mb-1 text-lg font-semibold tracking-tight text-zinc-100">
            {name}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-zinc-400">
            {description}
          </p>
        </div>

        <div className="absolute right-6 bottom-6 translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <Link href={href}>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
);
