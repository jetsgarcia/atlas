import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userType = request.cookies.get("userType")?.value;

  if (userType && pathname === "/") {
    if (userType === "Student") {
      return NextResponse.redirect(new URL("/student/courses", request.url));
    }
    if (userType === "Admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    if (userType === "Instructor") {
      return NextResponse.redirect(
        new URL("/instructor/subjects", request.url)
      );
    }
  }

  if (userType === "Student") {
    if (!pathname.startsWith("/student")) {
      return NextResponse.redirect(new URL("/student/courses", request.url));
    }
  }

  if (userType === "Admin") {
    if (!pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  if (userType === "Instructor") {
    if (!pathname.startsWith("/instructor")) {
      return NextResponse.redirect(
        new URL("/instructor/subjects", request.url)
      );
    }
  }

  if (!userType) {
    if (!pathname.startsWith("/login") && pathname !== "/") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student/:path*",
    "/admin/:path*",
    "/instructor/subjects/:path*",
    "/",
  ],
};
