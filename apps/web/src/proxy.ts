import { UserRole } from "@/db/schema/enums"
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

const publicRoutes = ["/", "/signin", "/signup", "/about"]

const allowedRoutesByRole: Record<UserRole, string[]> = {
  candidate: ["/dashboard"],
  recruiter: ["/recruiter"],
}

const privateRoutes = Object.values(allowedRoutesByRole).flat()

const hybridRoutes: string[] = []

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  const role = session?.user.role as UserRole | undefined

  const pathName = request.nextUrl.pathname

  /*
   * helper functio to redirect user to a specific URL
   * **/
  const redirectTo = (url: string) => NextResponse.redirect(new URL(url, request.url))

  /*
   * authenticated user cannot access public routes
   * **/
  if (role && publicRoutes.includes(pathName)) {
    return redirectTo(allowedRoutesByRole[role][0])
  }

  /*
   * unauthenticated user cannot access private routes
   * **/
  if (
    !role &&
    privateRoutes.some(route => pathName.startsWith(route)) &&
    !hybridRoutes.some(route => pathName.startsWith(route))
  ) {
    return redirectTo("/sginin")
  }

  /*
   * authenticated user cannot access private routes that are not allowed for their role
   * **/
  if (
    role &&
    privateRoutes.some(route => pathName.startsWith(route)) &&
    !allowedRoutesByRole[role].some(route => pathName.startsWith(route))
  ) {
    return redirectTo(allowedRoutesByRole[role][0])
  }

  return NextResponse.next()
}

// Exclude API routes, static files, etc.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
}
