import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// technical.x_robots_tag: send a blocking X-Robots-Tag on a normal, linkable page —
// the rule FAILs when a live page unintentionally carries "noindex" via this header.
// security.secure_cookies: set a cookie missing both Secure and HttpOnly on the
// /security page so the crawler's captured Set-Cookie header fails the check.
// technical.cache_headers: strip any Cache-Control/Expires headers on
// /technical-headers/no-cache so the crawler observes neither caching directive.
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (request.nextUrl.pathname === "/technical-markup") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  if (request.nextUrl.pathname === "/security") {
    response.headers.append(
      "Set-Cookie",
      "session_id=broken-fixture-demo; Path=/"
    );
  }
  if (request.nextUrl.pathname === "/technical-headers/no-cache") {
    response.headers.delete("Cache-Control");
    response.headers.delete("Expires");
  }
  return response;
}

export const config = {
  matcher: [
    "/technical-markup",
    "/security",
    "/technical-headers/no-cache",
  ],
};
