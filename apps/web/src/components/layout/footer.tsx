import { Button } from "@/components/ui/button"
import { PlusIcon } from "@/components/ui/plus-icon"
import { cn } from "@/lib/utils"
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react"

export default function Footer() {
  const company = [
    {
      title: "About Us",
      href: "#",
    },
    {
      title: "Careers",
      href: "#",
    },
    {
      title: "Brand assets",
      href: "#",
    },
    {
      title: "Privacy Policy",
      href: "#",
    },
    {
      title: "Terms of Service",
      href: "#",
    },
  ]

  const resources = [
    {
      title: "Blog",
      href: "#",
    },
    {
      title: "Help Center",
      href: "#",
    },
    {
      title: "Contact Support",
      href: "#",
    },
    {
      title: "Community",
      href: "#",
    },
    {
      title: "Security",
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: FacebookIcon,
      link: "#",
    },
    {
      icon: GithubIcon,
      link: "#",
    },
    {
      icon: InstagramIcon,
      link: "#",
    },
    {
      icon: LinkedinIcon,
      link: "#",
    },
    {
      icon: TwitterIcon,
      link: "#",
    },
    {
      icon: YoutubeIcon,
      link: "#",
    },
  ]
  return (
    <footer className="relative">
      <PlusIcon className="absolute -top-1.5 -left-1.5 text-white/50" />
      <PlusIcon className="absolute -top-1.5 -right-1.5 text-white/50" />
      <div
        className={cn(
          "mx-auto max-w-5xl lg:border-x lg:border-dotted lg:border-border",
          "dark:bg-[radial-gradient(35%_80%_at_30%_0%,--theme(--color-foreground/.1),transparent)]"
        )}
      >
        <div className="absolute inset-x-0 border-t border-dotted border-border" />
        <div className="grid max-w-5xl grid-cols-6 gap-6 p-4 relative">
          <div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-4">
            <h3 className="text-xl font-bold">HireXAI</h3>
            <p className="max-w-sm text-balance  text-muted-foreground text-sm">
              Designed for builders who value depth, clarity, and real results.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item, index) => (
                <Button key={`social-${item.link}-${index}`} size="icon-sm" variant="outline">
                  <a href={item.link} target="_blank">
                    <item.icon className="size-3.5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">Resources</span>
            <div className="mt-2 flex flex-col gap-2">
              {resources.map(({ href, title }) => (
                <a className="w-max text-sm hover:underline" href={href} key={title}>
                  {title}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">Company</span>
            <div className="mt-2 flex flex-col gap-2">
              {company.map(({ href, title }) => (
                <a className="w-max text-sm hover:underline" href={href} key={title}>
                  {title}
                </a>
              ))}
            </div>
          </div>

          <PlusIcon className="absolute -bottom-1.5 -left-1.5 text-white/50" />
          <PlusIcon className="absolute -bottom-1.5 -right-1.5 text-white/50" />
        </div>
        <div className="absolute inset-x-0 border-t border-dotted border-border" />
        <div className="flex max-w-4xl flex-col justify-between gap-2 py-4">
          <p className="text-center font-light text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} HireXAI, All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
