import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const url = request.nextUrl.pathname;

	const token = request.cookies.get("token")?.value;

	if (url.startsWith("/auth") && token)
		return NextResponse.redirect(new URL("/", request.url));

	if (url.startsWith("/me") && !token)
		return NextResponse.redirect(new URL("/auth/login", request.url));

	return NextResponse.next();
}

export const config = {
	matcher: ["/auth/:path*", "/me"],
};
