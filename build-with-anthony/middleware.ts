import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!req.auth) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    // Only allow the admin email
    const adminEmail = process.env.ADMIN_EMAIL || "buildwanthony@gmail.com";
    if (req.auth.user?.email !== adminEmail) {
      return new NextResponse("Unauthorized.", { status: 403 });
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
