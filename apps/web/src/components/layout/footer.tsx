import Link from "next/link"
import { Code2 } from "lucide-react"
import Container from "@/components/core/Container"
import { Card } from "@/components/ui/card"

export function Footer() {
  return (
    <footer className="w-full bg-background py-8">
      <Container className="px-4 sm:px-6">
        <Card className="p-8 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-3 mb-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary">
                  <Code2 className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold">HireXAI</span>
                <span className="rounded bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                  AI
                </span>
              </Link>
            </div>
            <p className="text-center max-w-xl text-sm font-normal leading-relaxed text-muted-foreground">
              Empowering developers and recruiters with AI-powered code evaluation. Transform GitHub repositories into comprehensive skill assessments.
            </p>
          </div>
          <div className="border-t border-border mt-8 pt-6">
            <div className="text-center text-sm font-normal text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">HireXAI</Link> ©{new Date().getFullYear()}. All rights reserved.
            </div>
          </div>
        </Card>
      </Container>
    </footer>
  )
}
