import { Application, Router, Context, Next } from "oak";
import { oakCors } from "cors";
import { featureFlagsRouter } from "./feature-flags/feature-flags.routes.ts";
import { environmentsRouter } from "./environments/environments.routes.ts";

// Create the Oak application
const app = new Application();
const router = new Router();

// Logger middleware
app.use(async (ctx: Context, next: Next): Promise<void> => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing middleware
app.use(async (ctx: Context, next: Next): Promise<void> => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Error handling middleware
app.use(async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (err: unknown) {
    const error = err as Error & { status?: number };
    ctx.response.status = error.status || 500;
    ctx.response.body = {
      success: false,
      message: error.message || "Internal Server Error",
    };
    console.error(error);
  }
});

// Enable CORS
app.use(oakCors());

// API routes
router.get("/", (ctx: Context): void => {
  ctx.response.body = {
    message: "Welcome to Feature Flag API",
    documentation: "/api-docs",
  };
});

// API version prefix
const apiRouter = new Router({ prefix: "/api" });
apiRouter.use("/feature-flags", featureFlagsRouter.routes(), featureFlagsRouter.allowedMethods());
apiRouter.use("/environments", environmentsRouter.routes(), environmentsRouter.allowedMethods());

// Use routers
app.use(router.routes());
app.use(apiRouter.routes());
app.use(router.allowedMethods());
app.use(apiRouter.allowedMethods());

// Start the server
const port = 3001;
console.log(`Server running on http://localhost:${port}`);
await app.listen({ port });
