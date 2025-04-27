import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "./app/[lang]/dictionaries";
import { getServerSession } from "next-auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if URL already includes locale
  const pathnameHasLocale = locales.filter(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )[0];

  if (pathnameHasLocale) {
    // Skip authentication check for public pages (login - landing page)
    if (pathname.endsWith(`/${pathnameHasLocale}/`) || pathname === `/${pathnameHasLocale}`) {
      return NextResponse.next();
    }

    // Get the session using next-auth's `getServerSession`
    const session = await getServerSession();

    // If no session, redirect to the login page
    if (!session) {
      return NextResponse.redirect(`/${pathnameHasLocale}`);
    }

    return NextResponse.next();
  }

  // Redirect to default locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip _next, api, and static files (handled inside middleware too)
    "/((?!_next|api|images|.*\\..*).*)",
  ],
};
