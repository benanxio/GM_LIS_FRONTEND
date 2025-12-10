import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/login")) {
    const hasAccess = req.cookies.get("access");
    const hasRefresh = req.cookies.get("refresh");

    if (!hasAccess && !hasRefresh) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Lis",
    "/((?!api|login|_next/static|_next/image).*)"
  ],
};
