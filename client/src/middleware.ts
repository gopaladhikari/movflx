import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
import { env } from "./config/env";

// eslint-disable-next-line no-restricted-exports
export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  const sessionToken = await getToken({
    req: request,
    secret: env.nextAuthSecret,
  });

  const token = request.cookies.get("token")?.value;

  if (url.startsWith("/auth") && token && sessionToken)
    return NextResponse.redirect(new URL("/me", request.url));

  if (url.startsWith("/me") && !token && !sessionToken)
    return NextResponse.redirect(new URL("/auth/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/me:path*"],
};
