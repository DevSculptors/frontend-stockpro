import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";


export async function middleware(request: NextRequest) {
  try {

    const token = request.cookies.get("token");

    // console.log("token", token);

    if (!token) {
      console.log("no token"); 
      return NextResponse.redirect(new URL('/', request.url)) 
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-token`, {
      method: "GET",
      headers: {
        token: token.value,
      },
    });

    const data = await res.json();

    const isAuthorizaded = data?.isAuthorizaded;

    if (!isAuthorizaded) {  
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: '/dashboard/:path*'
}
