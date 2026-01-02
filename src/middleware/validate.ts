import { AnyZodObject, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = parsedData.body;
      req.params = parsedData.params;
      req.query = parsedData.query;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // specific field-level errors format করা হচ্ছে
        const validationErrors = error.errors.map((err) => {
          return {
            // Path থেকে 'body', 'params' ইত্যাদি বাদ দিয়ে আসল ফিল্ডের নাম নেওয়া
            field: err.path.length > 1 ? err.path.slice(1).join(".") : err.path[0],
            message: err.message,
          };
        });

        return next({
          statusCode: 400,
          message: "Validation Error",
          errors: validationErrors,
        });
      }

      next(error);
    }
  };