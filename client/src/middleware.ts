import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { instance } from "./config/axios";

export function middleware(request: NextRequest) {
  const currentPathname = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value;
  if (token) instance.defaults.headers.common.Authorization = `Bearer ${token}`;

  const isAuthPage =
    currentPathname === "/auth/login" || currentPathname === "/auth/register";

  const isProtectedRoute = currentPathname === "/profile";

  if (token && isAuthPage)
    return NextResponse.redirect(new URL("/", request.url));

  if (isProtectedRoute && !token)
    return NextResponse.redirect(new URL("/auth/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/login", "/auth/register"],
};
