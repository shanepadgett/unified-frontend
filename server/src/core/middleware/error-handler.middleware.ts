import { Context, Next } from "oak";
import { BaseError } from "../errors/base-error.ts";

/**
 * Global error handling middleware
 * Catches all errors and formats them into a consistent response
 */
export async function errorHandlerMiddleware(ctx: Context, next: Next): Promise<void> {
  try {
    await next();
  } catch (err: unknown) {
    const error = err instanceof BaseError 
      ? err 
      : new BaseError(err instanceof Error ? err.message : String(err));
    
    ctx.response.status = error.status;
    ctx.response.body = {
      success: false,
      message: error.message,
      errors: 'errors' in error ? error.errors : undefined,
    };
    
    console.error(`[ERROR] ${error.name}: ${error.message}`);
    if (error.stack) {
      console.error(error.stack);
    }
  }
}
