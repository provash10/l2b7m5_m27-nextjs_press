import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const AUTH_ROUTES = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value ?? null;
  const decodedToken = accessToken
    ? (jwt.decode(accessToken) as JwtPayload | null)
    : null;

  let userRole: string | null = null;
  if (
    decodedToken &&
    typeof decodedToken === "object" &&
    "role" in decodedToken
  ) {
    userRole = decodedToken.role as string;
  }

  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "USER") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (userRole === "AUTHOR") {
      return NextResponse.redirect(new URL("/author-dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
