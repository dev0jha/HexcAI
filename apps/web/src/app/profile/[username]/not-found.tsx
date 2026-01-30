import Link from "next/link";

import { UserX } from "lucide-react";

import { Navbar } from "@/components/core/Navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center">
        <div className="px-4 text-center">
          <div className="bg-muted mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full">
            <UserX className="text-muted-foreground h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold">Profile Not Found</h1>
          <p className="text-muted-foreground mt-2 max-w-md">
            The developer profile you&apos;re looking for doesn&apos;t exist or
            may have been removed.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
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
  );
}
