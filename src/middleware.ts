import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/actions/session";

// just refactor this, meh (TODO)
export async function middleware(request: NextRequest) {
  try {
    const session = await getSession();

    if (
      session.isLoggedIn &&
      request.nextUrl.pathname.startsWith("/register")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (session.isLoggedIn && request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (!session.isLoggedIn && request.nextUrl.pathname.startsWith("/create")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/create", "/register", "/login"],
};
