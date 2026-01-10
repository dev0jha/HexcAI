import Link from "next/link"
import { Navbar } from "@/components/core/Navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { UserX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
            <UserX className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Profile Not Found</h1>
          <p className="text-muted-foreground mt-2 max-w-md">
            The developer profile you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button variant="outline" className="bg-transparent">
                Go Home
              </Button>
            </Link>
            <Link href="/recruiter/discover">
              <Button>Discover Developers</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
