import type { Metadata } from "next"
import { Poppins } from "next/font/google"

import { Toaster } from "sonner"

import { QueryProvider } from "../components/providers/query-client-provider"
import { ThemeProvider } from "../components/theme-provider"
import "./globals.css"

const poppins = Poppins({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700", "800", "900"],
   variable: "--font-poppins",
})
export const metadata: Metadata = {
   title: "HireXAI - AI-Powered Code Assessment for Efficient Hiring",
   description:
      "HireXAI leverages AI to streamline your hiring process by analyzing code submissions, enabling you to identify top talent quickly and accurately.",
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={`${poppins.variable} antialiased`}>
            <QueryProvider>
               <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
                  {children}
                  <Toaster
                     theme="system"
                     className="toaster group"
                     toastOptions={{
                        classNames: {
                           toast: "group toast group-[.toaster]:bg-popover group-[.toaster]:text-popover-foreground group-[.toaster]:border group-[.toaster]:shadow-lg",
                           description: "group-[.toaster]:text-muted-foreground",
                           actionButton:
                              "group-[.toaster]:bg-primary group-[.toaster]:text-primary-foreground",
                           cancelButton:
                              "group-[.toaster]:bg-muted group-[.toaster]:text-muted-foreground",
                        },
                     }}
                  />
               </ThemeProvider>
            </QueryProvider>
         </body>
      </html>
   )
}
