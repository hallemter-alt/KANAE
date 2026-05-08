import { NextResponse } from "next/server";
import { isLocale } from "@/lib/content";

export function middleware(request: { nextUrl: { pathname: string }; url: string }) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (!first) {
    return NextResponse.redirect(new URL("/ja", request.url));
  }

  if (!isLocale(first)) {
    return NextResponse.redirect(new URL(`/ja${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
