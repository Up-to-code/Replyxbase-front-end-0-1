/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Compose i18n middleware in a single default export
const i18n = createMiddleware(routing);

export default function middleware(req: any) {
  return i18n(req);
}

// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)", "/(en|ar)/:path*"],
};