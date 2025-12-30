import { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service";
import { sendSuccess } from "../../utils/apiResponse";

 const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await authService.sendOTP(req.body.email);
          return sendSuccess(res,{
            statusCode:200,
              message: "OTP sent successfully" 
        })
       
    } catch (error) { next(error); }
};

 const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await authService.resetWithOTP(req.body);
        return sendSuccess(res,{
            statusCode:200,
             message: "Password reset successful"
        })
       
    } catch (error) { next(error); }
};

export const authControllers = {forgotPassword,resetPassword}
