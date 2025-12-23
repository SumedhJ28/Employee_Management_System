import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // TEMP AUTH STATE (frontend only)
  const role = request.cookies.get("role")?.value;

  // If not logged in
  if (!role && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // HR trying to access employee pages
  if (pathname.startsWith("/employee") && role !== "employee") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Employee trying to access HR pages
  if (pathname.startsWith("/hr") && role !== "hr") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/employee/:path*", "/hr/:path*"],
};
