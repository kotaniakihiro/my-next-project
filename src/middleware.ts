import { createNextAuthMiddleware } from "nextjs-basic-auth-middleware";

export const middleware = createNextAuthMiddleware();
// すべてのページに適用
export const config = {
  matcher: ["/(.*)"],
};
