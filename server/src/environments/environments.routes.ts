import { Router, Status, Context, RouterContext } from "oak";
import { environmentsService } from "./environments.service.ts";
import { CreateEnvironment, UpdateEnvironment, validateCreateEnvironment, validateUpdateEnvironment } from "./environment.model.ts";

export const environmentsRouter = new Router();

// Get all environments
environmentsRouter.get("/", (ctx: Context): void => {
  ctx.response.body = environmentsService.findAll();
});

// Get a specific environment by ID
environmentsRouter.get("/:id", (ctx: RouterContext<"/:id">): void => {
  const id = ctx.params.id;
  if (!id) {
    ctx.response.status = Status.BadRequest;
    ctx.response.body = { message: "ID parameter is required" };
    return;
  }

  const environment = environmentsService.findOne(id);
  if (!environment) {
    ctx.response.status = Status.NotFound;
    ctx.response.body = { message: `Environment with ID ${id} not found` };
    return;
  }

  ctx.response.body = environment;
});

// Get environment by name
environmentsRouter.get("/name/:name", (ctx: RouterContext<"/name/:name">): void => {
  const name = ctx.params.name;
  if (!name) {
    ctx.response.status = Status.BadRequest;
    ctx.response.body = { message: "Name parameter is required" };
    return;
  }

  const environment = environmentsService.findByName(name);
  if (!environment) {
    ctx.response.status = Status.NotFound;
    ctx.response.body = { message: `Environment with name ${name} not found` };
    return;
  }

  ctx.response.body = environment;
});

// Get default environment
environmentsRouter.get("/default/get", (ctx: Context): void => {
  const environment = environmentsService.findDefault();
  if (!environment) {
    ctx.response.status = Status.NotFound;
    ctx.response.body = { message: "No default environment found" };
    return;
  }

  ctx.response.body = environment;
});

// Create a new environment
environmentsRouter.post("/", async (ctx: Context): Promise<void> => {
  try {
    const body = ctx.request.body();

    if (body.type !== "json") {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { message: "JSON body is required" };
      return;
    }

    const createEnvDto = await body.value as CreateEnvironment;
    const validation = validateCreateEnvironment(createEnvDto);

    if (!validation.isValid) {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { message: "Validation failed", errors: validation.errors };
      return;
    }

    // Check if environment with same name already exists
    const existingEnv = environmentsService.findByName(createEnvDto.name);
    if (existingEnv) {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { message: `Environment with name ${createEnvDto.name} already exists` };
      return;
    }

    const newEnv = environmentsService.create(createEnvDto);
    ctx.response.status = Status.Created;
    ctx.response.body = newEnv;
  } catch (error: unknown) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = {
      message: "Failed to create environment",
      error: error instanceof Error ? error.message : String(error)
    };
  }
});

// Update an environment
environmentsRouter.patch("/:id", async (ctx: RouterContext<"/:id">): Promise<void> => {
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

    const updateEnvDto = await body.value as UpdateEnvironment;
    const validation = validateUpdateEnvironment(updateEnvDto);

    if (!validation.isValid) {
      ctx.response.status = Status.BadRequest;
      ctx.response.body = { message: "Validation failed", errors: validation.errors };
      return;
    }

    // If name is being updated, check if it already exists
    if (updateEnvDto.name) {
      const existingEnv = environmentsService.findByName(updateEnvDto.name);
      if (existingEnv && existingEnv.id !== id) {
        ctx.response.status = Status.BadRequest;
        ctx.response.body = { message: `Environment with name ${updateEnvDto.name} already exists` };
        return;
      }
    }

    const updatedEnv = environmentsService.update(id, updateEnvDto);
    if (!updatedEnv) {
      ctx.response.status = Status.NotFound;
      ctx.response.body = { message: `Environment with ID ${id} not found` };
      return;
    }

    ctx.response.body = updatedEnv;
  } catch (error: unknown) {
    ctx.response.status = Status.InternalServerError;
    ctx.response.body = {
      message: "Failed to update environment",
      error: error instanceof Error ? error.message : String(error)
    };
  }
});

// Delete an environment
environmentsRouter.delete("/:id", (ctx: RouterContext<"/:id">): void => {
  const id = ctx.params.id;
  if (!id) {
    ctx.response.status = Status.BadRequest;
    ctx.response.body = { message: "ID parameter is required" };
    return;
  }

  // Check if this is the default environment
  const env = environmentsService.findOne(id);
  if (env && env.isDefault) {
    ctx.response.status = Status.BadRequest;
    ctx.response.body = { message: "Cannot delete the default environment" };
    return;
  }

  const deleted = environmentsService.remove(id);
  if (!deleted) {
    ctx.response.status = Status.NotFound;
    ctx.response.body = { message: `Environment with ID ${id} not found or could not be deleted` };
    return;
  }

  ctx.response.status = Status.NoContent;
});
