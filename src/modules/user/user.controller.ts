import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import { fromNodeHeaders } from "better-auth/node";
import { sendSuccess } from "../../utils/apiResponse";

 const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const headers = fromNodeHeaders(req.headers);
        await userService.updatePassword(req.body, headers);
          return sendSuccess(res,{
            statusCode:200,
            message: "Password changed successfully"
        })
       
    } catch (error) { next(error); }
};

 const getProfileDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const headers = fromNodeHeaders(req.headers);
        const session = await userService.getProfile(headers);
       return sendSuccess(res,{
        message:"profile data fetch successFully",
        data:session
       })
    } catch (error) { next(error); }
};

export const userControllers = {changePassword,getProfileDetails}