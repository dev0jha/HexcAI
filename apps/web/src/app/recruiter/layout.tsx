import type React from "react";

import { RecruiterHeader } from "@/components/layout/recuriter-header";
import { RecruiterSidebar } from "@/components/layout/recuriter-sidebar";

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background min-h-screen">
      <RecruiterSidebar />
      <RecruiterHeader />
      <main className="pt-16 md:ml-64">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
