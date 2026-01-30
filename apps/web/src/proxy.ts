import { NextRequest, NextResponse } from "next/server";

import { UserRole } from "@/db/schema/enums";
import { auth } from "@/lib/auth";
import { attempt } from "@/utils/attempt";

const publicRoutes = ["/", "/signin", "/signup", "/about"];

const allowedRoutesByRole: Record<UserRole, string[]> = {
  candidate: ["/dashboard"],
  recruiter: ["/recruiter"],
};

const privateRoutesPrefixes = Object.values(allowedRoutesByRole).flat();

const hybridRoutes: string[] = [];

/*
 *
 * request redirector
 * **/

function createRequestRedirector(request: NextRequest) {
  return (url: string) => NextResponse.redirect(new URL(url, request.url));
}

/*
 *
 *match route utility
 * **/

const matchRoute = (pathname: string, routes: string[]) => {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
};

export async function proxy(request: NextRequest) {
  const redirectTo = createRequestRedirector(request);

  const pathName = request.nextUrl.pathname;

  const sessionRes = await attempt(() =>
    auth.api.getSession({
      headers: request.headers,
    })
  );

  if (!sessionRes.ok) {
    console.error("Error fetching session:", sessionRes.error);

    if (
      matchRoute(pathName, publicRoutes) ||
      matchRoute(pathName, hybridRoutes)
    ) {
      return NextResponse.next();
    }

    return redirectTo("/signin");
  }

  const session = sessionRes.data;

  /*
   * rednering logic
   * **/
  const role = session?.user.role as UserRole | undefined;

  /*
   * authenticated user cannot access public routes
   * **/
  if (role && matchRoute(pathName, publicRoutes)) {
    return redirectTo(allowedRoutesByRole[role][0]);
  }

  /*
   * unauthenticated user cannot access private routes
   * **/
  if (
    !role &&
    matchRoute(pathName, privateRoutesPrefixes) &&
    !matchRoute(pathName, hybridRoutes)
  ) {
    return redirectTo("/signin");
  }

  /*
   * authenticated user cannot access private routes that are not allowed for their role
   * **/
  if (
    role &&
    matchRoute(pathName, privateRoutesPrefixes) &&
    !matchRoute(pathName, allowedRoutesByRole[role])
  ) {
    return redirectTo(allowedRoutesByRole[role][0]);
  }

  return NextResponse.next();
}

// Exclude API routes, static files, etc.
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
