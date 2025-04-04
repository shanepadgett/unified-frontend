import { Context, Next } from "oak";

/**
 * Logger middleware
 * Logs request method, URL, and response time
 */
export async function loggerMiddleware(ctx: Context, next: Next): Promise<void> {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
  console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
}
