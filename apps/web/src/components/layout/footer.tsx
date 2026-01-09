import Link from "next/link"
import { Code2, Github, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Code2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">DevScore</span>
              <span className="rounded bg-primary/20 px-1.5 py-0.5 text-xs font-medium text-primary">
                AI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              AI-powered developer evaluation. Real code, real skills.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/pricing" className="hover:text-foreground">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Developers</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard" className="hover:text-foreground">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/analyze" className="hover:text-foreground">
                  Analyze Repo
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Recruiters</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/recruiter/discover" className="hover:text-foreground">
                  Discover Talent
                </Link>
              </li>
              <li>
                <Link href="/recruiter/candidates" className="hover:text-foreground">
                  My Candidates
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Enterprise
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DevScore AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
