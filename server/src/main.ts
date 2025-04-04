import { Application, Router, Context } from "oak";
import { oakCors } from "cors";

// Import core components
import { errorHandlerMiddleware, loggerMiddleware } from "./core/index.ts";

// Import feature controllers
import { featureFlagController } from "./features/feature-flags/index.ts";
import { environmentController } from "./features/environments/index.ts";

// Create the Oak application
const app = new Application();
const router = new Router();

// Apply global middleware
app.use(errorHandlerMiddleware);
app.use(loggerMiddleware);

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
apiRouter.use("/feature-flags", featureFlagController.router.routes(), featureFlagController.router.allowedMethods());
apiRouter.use("/environments", environmentController.router.routes(), environmentController.router.allowedMethods());

// Use routers
app.use(router.routes());
app.use(apiRouter.routes());
app.use(router.allowedMethods());
app.use(apiRouter.allowedMethods());

// Start the server
const port = 3002;
console.log(`Server running on http://localhost:${port}`);
await app.listen({ port });
