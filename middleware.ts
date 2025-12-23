import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value;
  const pathname = request.nextUrl.pathname;

  /* ================= LOGIN GUARD ================= */

  // Logged-in users should NOT access /login
  if (pathname === "/login" && role) {
    if (role === "hr") {
      return NextResponse.redirect(
        new URL("/hr/dashboard", request.url)
      );
    }

    if (role === "employee") {
      return NextResponse.redirect(
        new URL("/employee/dashboard", request.url)
      );
    }
  }

  /* ================= AUTH GUARD ================= */

  // Allow login page for logged-out users
  if (pathname === "/login") {
    return NextResponse.next();
  }

  // Not logged in → force login
  if (!role) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  /* ================= ROLE GUARDS ================= */

  // HR accessing employee routes
  if (role === "hr" && pathname.startsWith("/employee")) {
    return NextResponse.redirect(
      new URL("/hr/dashboard", request.url)
    );
  }

  // Employee accessing HR routes
  if (role === "employee" && pathname.startsWith("/hr")) {
    return NextResponse.redirect(
      new URL("/employee/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/hr/:path*", "/employee/:path*"],
};
