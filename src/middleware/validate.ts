import { AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/apiResponse";

export const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendError(res,{
          statusCode:400,
          message: "Validation failed",
          errors: error.errors.map((err) => ({
            field: err.path.join(".") || "valid input required",
            message: err.message,
          })),
        
        })
      }

      // fallback (unexpected error)
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };
