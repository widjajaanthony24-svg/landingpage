import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Never redirect the login page itself — avoids infinite redirect loop
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const adminEmail = process.env.ADMIN_EMAIL || "buildwanthony@gmail.com";
    const isAuthorized = !!req.auth && req.auth.user?.email === adminEmail;

    if (!isAuthorized) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
