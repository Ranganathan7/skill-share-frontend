import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "./app/[lang]/dictionaries";
import Cookies from "js-cookie";

export const authCookieKey = 'skill-share-login-access-token'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if URL already includes locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Skipping check for login page
    if (locales.some(locale => pathname.endsWith(`/${locale}/`) || pathname.endsWith(`/${locale}`))) {
      return NextResponse.next();
    }

    const token = Cookies.get(authCookieKey)

    if (token) {
      return NextResponse.next()
    }

    // Redirect to default locale
    request.nextUrl.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(request.nextUrl);
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
