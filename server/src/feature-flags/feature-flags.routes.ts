import { Router, Status, Context, RouterContext } from "oak";
import { featureFlagsService } from "./feature-flags.service.ts";
import { CreateFeatureFlag, UpdateFeatureFlag, validateCreateFeatureFlag, validateUpdateFeatureFlag } from "./feature-flag.model.ts";

export const featureFlagsRouter = new Router();

// Get all feature flags
featureFlagsRouter.get("/", (ctx: Context): void => {
  ctx.response.body = featureFlagsService.findAll();
});

// Get feature flags by environment
featureFlagsRouter.get("/env/:environment", (ctx: RouterContext<"/env/:environment">): void => {
  const environment = ctx.params.environment;
  if (!environment) {
    ctx.response.status = Status.BadRequest;
    ctx.response.body = { message: "Environment parameter is required" };
    return;
  }

  ctx.response.body = featureFlagsService.findByEnvironment(environment);
});

// Get a specific feature flag
featureFlagsRouter.get("/:id", (ctx: RouterContext<"/:id">): void => {
  const id = ctx.params.id;
  if (!id) {
    ctx.response.status = Status.BadRequest;
    ctx.response.body = { message: "ID parameter is required" };
    return;
  }

  const featureFlag = featureFlagsService.findOne(id);
  if (!featureFlag) {
    ctx.response.status = Status.NotFound;
    ctx.response.body = { message: `Feature flag with ID ${id} not found` };
    return;
  }

  ctx.response.body = featureFlag;
});

// Create a new feature flag
featureFlagsRouter.post("/", async (ctx: Context): Promise<void> => {
  try {
    const body = ctx.request.body();

    if (body.type !== "json") {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { message: "JSON body is required" };
      return;
    }

    const createFlagDto = await body.value as CreateFeatureFlag;
    const validation = validateCreateFeatureFlag(createFlagDto);

    if (!validation.isValid) {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { message: "Validation failed", errors: validation.errors };
      return;
    }

    const newFlag = featureFlagsService.create(createFlagDto);
    ctx.response.status = Status.Created;
    ctx.response.body = newFlag;
  } catch (error: unknown) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = {
      message: "Failed to create feature flag",
      error: error instanceof Error ? error.message : String(error)
    };
  }
});

// Update a feature flag
featureFlagsRouter.patch("/:id", async (ctx: RouterContext<"/:id">): Promise<void> => {
  try {
    const id = ctx.params.id;
    if (!id) {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { message: "ID parameter is required" };
      return;
    }

    const body = ctx.request.body();

    if (body.type !== "json") {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { message: "JSON body is required" };
      return;
    }

    const updateFlagDto = await body.value as UpdateFeatureFlag;
    const validation = validateUpdateFeatureFlag(updateFlagDto);

    if (!validation.isValid) {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { message: "Validation failed", errors: validation.errors };
      return;
    }

    const updatedFlag = featureFlagsService.update(id, updateFlagDto);
    if (!updatedFlag) {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { message: `Feature flag with ID ${id} not found` };
      return;
    }

    ctx.response.body = updatedFlag;
  } catch (error: unknown) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = {
      message: "Failed to update feature flag",
      error: error instanceof Error ? error.message : String(error)
    };
  }
});

// Toggle a feature flag
featureFlagsRouter.patch("/:id/toggle", (ctx: RouterContext<"/:id/toggle">): void => {
  const id = ctx.params.id;
  if (!id) {
    ctx.response.status = Status.BadRequest;
    ctx.response.body = { message: "ID parameter is required" };
    return;
  }

  const updatedFlag = featureFlagsService.toggle(id);
  if (!updatedFlag) {
    ctx.response.status = Status.NotFound;
    ctx.response.body = { message: `Feature flag with ID ${id} not found` };
    return;
  }

  ctx.response.body = updatedFlag;
});

// Delete a feature flag
featureFlagsRouter.delete("/:id", (ctx: RouterContext<"/:id">): void => {
  const id = ctx.params.id;
  if (!id) {
    ctx.response.status = Status.BadRequest;
    ctx.response.body = { message: "ID parameter is required" };
    return;
  }

  const deleted = featureFlagsService.remove(id);
  if (!deleted) {
    ctx.response.status = Status.NotFound;
    ctx.response.body = { message: `Feature flag with ID ${id} not found` };
    return;
  }

  ctx.response.status = Status.NoContent;
});
