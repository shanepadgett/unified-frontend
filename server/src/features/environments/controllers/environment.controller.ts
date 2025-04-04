import { Router, Status, Context, RouterContext } from "oak";
import { environmentService } from "../services/environment.service.ts";
import { validateAndParseCreateEnvironment, validateAndParseUpdateEnvironment } from "../validation/environment.validation.ts";
import { BadRequestError } from "../../../core/errors/base-error.ts";

/**
 * Controller for environments
 * Handles HTTP requests for environments
 */
export class EnvironmentController {
  public router: Router;

  constructor() {
    this.router = new Router();
    this.setupRoutes();
  }

  /**
   * Sets up the routes for the controller
   */
  private setupRoutes(): void {
    // Get all environments
    this.router.get("/", this.getAllEnvironments.bind(this));

    // Get a specific environment
    this.router.get("/:id", this.getEnvironmentById.bind(this));

    // Get the default environment
    this.router.get("/default", this.getDefaultEnvironment.bind(this));

    // Create a new environment
    this.router.post("/", this.createEnvironment.bind(this));

    // Update an environment
    this.router.patch("/:id", this.updateEnvironment.bind(this));

    // Delete an environment
    this.router.delete("/:id", this.deleteEnvironment.bind(this));
  }

  /**
   * Gets all environments
   * @param ctx The context
   */
  private getAllEnvironments(ctx: Context): void {
    ctx.response.body = environmentService.findAll();
  }

  /**
   * Gets an environment by ID
   * @param ctx The context
   */
  private getEnvironmentById(ctx: RouterContext<"/:id">): void {
    const id = ctx.params.id;
    if (!id) {
      throw new BadRequestError("ID parameter is required");
    }

    ctx.response.body = environmentService.findOne(id);
  }

  /**
   * Gets the default environment
   * @param ctx The context
   */
  private getDefaultEnvironment(ctx: Context): void {
    ctx.response.body = environmentService.findDefault();
  }

  /**
   * Creates a new environment
   * @param ctx The context
   */
  private async createEnvironment(ctx: Context): Promise<void> {
    const body = ctx.request.body();

    if (body.type !== "json") {
      throw new BadRequestError("JSON body is required");
    }

    const createEnvDto = await body.value;
    const validatedDto = validateAndParseCreateEnvironment(createEnvDto);
    
    const newEnvironment = environmentService.create(validatedDto);
    ctx.response.status = Status.Created;
    ctx.response.body = newEnvironment;
  }

  /**
   * Updates an environment
   * @param ctx The context
   */
  private async updateEnvironment(ctx: RouterContext<"/:id">): Promise<void> {
    const id = ctx.params.id;
    if (!id) {
      throw new BadRequestError("ID parameter is required");
    }

    const body = ctx.request.body();

    if (body.type !== "json") {
      throw new BadRequestError("JSON body is required");
    }

    const updateEnvDto = await body.value;
    const validatedDto = validateAndParseUpdateEnvironment(updateEnvDto);
    
    const updatedEnvironment = environmentService.update(id, validatedDto);
    ctx.response.body = updatedEnvironment;
  }

  /**
   * Deletes an environment
   * @param ctx The context
   */
  private deleteEnvironment(ctx: RouterContext<"/:id">): void {
    const id = ctx.params.id;
    if (!id) {
      throw new BadRequestError("ID parameter is required");
    }

    environmentService.remove(id);
    ctx.response.status = Status.NoContent;
  }
}

// Create a singleton instance
export const environmentController = new EnvironmentController();
