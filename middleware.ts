import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware:::" + request.url);
  return NextResponse.next();
}

// すべてのページに適用
export const config = {
  matcher: "/:path*",
};
