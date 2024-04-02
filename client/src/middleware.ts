import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const currentPathname = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value;

  const isAuthPage =
    currentPathname === "/auth/login" || currentPathname === "/auth/register";

  const isProtectedRoute = currentPathname === "/profile";

  if (token && isAuthPage)
    return NextResponse.redirect(new URL("/", request.url));

  if (isProtectedRoute && !token)
    return NextResponse.redirect(new URL("/auth/login", request.url));

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/auth/login", "/auth/register"],
};
