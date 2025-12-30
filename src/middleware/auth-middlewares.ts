import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";
import { Session, User } from "better-auth/types";
declare global {
  namespace Express {
    interface Request {
      user?: User;       // Now req.user is recognized globally
      session?: Session; // Now req.session is recognized globally
    }
  }
}

export const isAuthenticate = (...roles: string[]) => {

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const headers = fromNodeHeaders(req.headers);
      const session = await auth.api.getSession({ headers });

      if (session) {
        // Attach the user and session data to the request object for use in subsequent handlers
        req.user = session.user;
        req.session = session.session;
      
      } else {
        // If no session is found, send a 401 Unauthorized response
        res.status(401).json({ message: "Authentication required." });
      }


      if (roles.length > 0) {
        const userRole = session?.user.role as string;

        if (!roles.includes(userRole)) {
          res.status(403).json({
            status: "error",
            message: `Forbidden: Access restricted to [${roles.join(", ")}] roles.`
          });
          return; // CRITICAL: Stop execution here
        }
      }

      next()
    } catch (error) {
      console.error("Auth middleware error:", error);
      res.status(500).json({ message: "Authentication service error." });
    }

  }
}

export const authorize = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => {

  next()
}
