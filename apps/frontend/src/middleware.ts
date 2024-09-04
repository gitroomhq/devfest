import { auth } from "@frontend/auth";
export default auth;

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
}
