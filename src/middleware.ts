import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async function middleware(request:NextRequest) {
    const token = await getToken({req: request})
    const url = request.nextUrl
    console.log(request.url, "request.url")
    console.log(url, "request.url")
    
    // Redirect if the user is authenticated and trying to access auth pages
    if (
        token &&
        (url.pathname.startsWith("/sign-in") ||
          url.pathname.startsWith("/sign-up") ||
          url.pathname.startsWith("/verify") ||
          url.pathname === "/")
      ) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }



}

export const  config = {
    matcher: ["/sign-in", "/sign-up"]
}