import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token");

    if (!token) {
      
      return NextResponse.redirect(new URL("/", request.url));
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-token`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token.value}`,
      },
    });

    const data = await res.json();

    // console.log("data", data);

    const isAuthorizaded = data?.isAuthorizaded;
    const role = data?.role;

    // console.log("isAuthorized ", isAuthorizaded, "role ", role);

    if (!isAuthorizaded || !role) {
      console.log("not authorized");
      return NextResponse.redirect(new URL("/", request.url));
    }

    const requestedPath = new URL(request.url).pathname;

    // Se puede optimizar 
    // Pero no se como XD

    if (role === "admin") {
      if (requestedPath.startsWith("/dashboard")) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } else if (role === "cashier") {
      if (requestedPath.startsWith("/cashier")) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/cashier", request.url));
      }
    }

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/cashier/:path*"],
};
