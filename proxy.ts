import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/news"];

// Standalone Web Crypto JWT verification for Next.js Edge Runtime compatibility
async function verifyToken(token: string, secret: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { success: false, error: "Invalid token format" };
    }

    const [headerB64, payloadB64, signatureB64] = parts;

    // Decode payload
    const payloadJson = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson);

    // Check expiration
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return { success: false, error: "Token expired" };
    }

    // Verify signature using Web Crypto API (HMAC SHA-256)
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const dataToVerify = encoder.encode(`${headerB64}.${payloadB64}`);

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // Decode signature
    const signatureBin = Uint8Array.from(
      atob(signatureB64.replace(/-/g, '+').replace(/_/g, '/')),
      c => c.charCodeAt(0)
    );

    const isValid = await crypto.subtle.verify(
      "HMAC",
      cryptoKey,
      signatureBin,
      dataToVerify
    );

    if (!isValid) {
      return { success: false, error: "Signature verification failed" };
    }

    return { success: true, data: payload };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? await verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  const decodedRefreshToken = refreshToken
    ? await verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string)
    : null;

  let newAccessTokenSet = false;
  let newAccessToken: string | null = null;

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    console.log("Access token expired, refreshing in proxy...");
    try {
      const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
          Cookie: `refreshToken=${refreshToken}`
        },
        cache: "no-cache",
      });

      const result = await res.json();
      if (result.success) {
        newAccessToken = result.data.accessToken;
        accessToken = newAccessToken!;
        newAccessTokenSet = true;

        // Re-verify the new access token
        decodedAccessToken = await verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string);
      }
    } catch (err) {
      console.error("Token refresh failed in proxy:", err);
    }
  }

  let userRole = null;
  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = decodedAccessToken.data.role;
  }

  let response = NextResponse.next();

  if (newAccessTokenSet && newAccessToken) {
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    response.headers.set("cookie", `accessToken=${newAccessToken}; refreshToken=${refreshToken}`);
  }

  if (!decodedAccessToken?.success && !newAccessTokenSet && request.cookies.has("accessToken")) {
    response.cookies.delete("accessToken");
  }

  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    let redirectUrl = "/";
    if (userRole === "USER") redirectUrl = "/dashboard";
    else if (userRole === "ADMIN") redirectUrl = "/admin-dashboard";
    else if (userRole === "AUTHOR") redirectUrl = "/author-dashboard";

    const redirectResponse = NextResponse.redirect(new URL(redirectUrl, request.url));
    if (newAccessTokenSet && newAccessToken) {
      redirectResponse.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });
    }
    return redirectResponse;
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/dashboard") && userRole !== "USER") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (pathname.startsWith("/author-dashboard") && userRole !== "AUTHOR") {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (pathname === "/premium") {
    try {
      const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
        headers: {
          Cookie: `accessToken=${accessToken}`
        },
        cache: "no-store",
      });

      const profileResult = await res.json();
      const isActive = Boolean(
        profileResult?.success &&
        profileResult.data?.profile?.subscription?.status === "ACTIVE"
      );

      if (!isActive) {
        const redirectResponse = NextResponse.redirect(new URL("/payment", request.url));
        if (newAccessTokenSet && newAccessToken) {
          redirectResponse.cookies.set("accessToken", newAccessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax",
          });
        }
        return redirectResponse;
      }
    } catch (err) {
      console.error("Subscription status check failed:", err);
      return NextResponse.redirect(new URL("/payment", request.url));
    }
  }

  //no need
  // if (pathname === "/payment") {
  //   try {
  //     const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
  //       headers: {
  //         Cookie: `accessToken=${accessToken}`
  //       },
  //       cache: "no-store",
  //     });

  //     const profileResult = await res.json();
  //     const isActive = Boolean(
  //       profileResult?.success &&
  //       profileResult.data?.profile?.subscription?.status === "ACTIVE"
  //     );

  //     if (!isActive) {
  //       const redirectResponse = NextResponse.redirect(new URL("/premium", request.url));
  //       if (newAccessTokenSet && newAccessToken) {
  //         redirectResponse.cookies.set("accessToken", newAccessToken, {
  //           httpOnly: true,
  //           maxAge: 60 * 60 * 24,
  //           sameSite: "lax",
  //         });
  //       }
  //       return redirectResponse;
  //     }
  //   } catch (err) {
  //     console.error("Subscription status check failed:", err);
  //     return NextResponse.redirect(new URL("/payment", request.url));
  //   }
  // }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
