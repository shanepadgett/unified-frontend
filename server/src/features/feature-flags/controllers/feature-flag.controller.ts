import { Router, Status, Context, RouterContext } from "oak";
import { featureFlagService } from "../services/feature-flag.service.ts";
import { validateAndParseCreateFeatureFlag, validateAndParseUpdateFeatureFlag } from "../validation/feature-flag.validation.ts";
import { BadRequestError } from "../../../core/errors/base-error.ts";

/**
 * Controller for feature flags
 * Handles HTTP requests for feature flags
 */
export class FeatureFlagController {
  public router: Router;

  constructor() {
    this.router = new Router();
    this.setupRoutes();
  }

  /**
   * Sets up the routes for the controller
   */
  private setupRoutes(): void {
    // Get all feature flags
    this.router.get("/", this.getAllFeatureFlags.bind(this));

    // Get feature flags by environment
    this.router.get("/env/:environment", this.getFeatureFlagsByEnvironment.bind(this));

    // Get a specific feature flag - using a regex to ensure id doesn't match other routes
    this.router.get("/:id([0-9a-f-]+)", this.getFeatureFlagById.bind(this));

    // Create a new feature flag
    this.router.post("/", this.createFeatureFlag.bind(this));

    // Update a feature flag
    this.router.patch("/:id([0-9a-f-]+)", this.updateFeatureFlag.bind(this));

    // Toggle a feature flag
    this.router.patch("/:id([0-9a-f-]+)/toggle", this.toggleFeatureFlag.bind(this));

    // Delete a feature flag
    this.router.delete("/:id([0-9a-f-]+)", this.deleteFeatureFlag.bind(this));
  }

  /**
   * Gets all feature flags
   * @param ctx The context
   */
  private getAllFeatureFlags(ctx: Context): void {
    ctx.response.body = featureFlagService.findAll();
  }

  /**
   * Gets feature flags by environment
   * @param ctx The context
   */
  private getFeatureFlagsByEnvironment(ctx: RouterContext<string>): void {
    const environment = ctx.params.environment;
    if (!environment) {
      throw new BadRequestError("Environment parameter is required");
    }

    ctx.response.body = featureFlagService.findByEnvironment(environment);
  }

  /**
   * Gets a feature flag by ID
   * @param ctx The context
   */
  private getFeatureFlagById(ctx: RouterContext<string>): void {
    const id = ctx.params.id;
    if (!id) {
      throw new BadRequestError("ID parameter is required");
    }

    ctx.response.body = featureFlagService.findOne(id);
  }

  /**
   * Creates a new feature flag
   * @param ctx The context
   */
  private async createFeatureFlag(ctx: Context): Promise<void> {
    const body = ctx.request.body();

    if (body.type !== "json") {
      throw new BadRequestError("JSON body is required");
    }

    const createFlagDto = await body.value;
    const validatedDto = validateAndParseCreateFeatureFlag(createFlagDto);

    const newFlag = featureFlagService.create(validatedDto);
    ctx.response.status = Status.Created;
    ctx.response.body = newFlag;
  }

  /**
   * Updates a feature flag
   * @param ctx The context
   */
  private async updateFeatureFlag(ctx: RouterContext<string>): Promise<void> {
    const id = ctx.params.id;
    if (!id) {
      throw new BadRequestError("ID parameter is required");
    }

    const body = ctx.request.body();

    if (body.type !== "json") {
      throw new BadRequestError("JSON body is required");
    }

    const updateFlagDto = await body.value;
    const validatedDto = validateAndParseUpdateFeatureFlag(updateFlagDto);

    const updatedFlag = featureFlagService.update(id, validatedDto);
    ctx.response.body = updatedFlag;
  }

  /**
   * Toggles a feature flag
   * @param ctx The context
   */
  private toggleFeatureFlag(ctx: RouterContext<string>): void {
    const id = ctx.params.id;
    if (!id) {
      throw new BadRequestError("ID parameter is required");
    }

    const updatedFlag = featureFlagService.toggle(id);
    ctx.response.body = updatedFlag;
  }

  /**
   * Deletes a feature flag
   * @param ctx The context
   */
  private deleteFeatureFlag(ctx: RouterContext<string>): void {
    const id = ctx.params.id;
    if (!id) {
      throw new BadRequestError("ID parameter is required");
    }

    featureFlagService.remove(id);
    ctx.response.status = Status.NoContent;
  }
}

// Create a singleton instance
export const featureFlagController = new FeatureFlagController();
