import { HttpStatusCodes } from "@/constants";
import { customResponse } from "@/utils";
import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() { 
     this.authService = new AuthService();
  }


  loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

    const { email, password } = req.body;

    const data = await this.authService.loginUserWithPassword({ email, password });


    const response = customResponse().success(HttpStatusCodes.OK, data, `You have been login! Please continue.`)
    
    return res.status(response.statusCode).json(response);
    
    } catch (err) {
      console.log(`[LoginHandlerError]: ${err}`);

      // Handle specific Supabase auth errors
      if (err instanceof Error && err.message.includes('email_not_confirmed')) {
        const response = customResponse().error(
          HttpStatusCodes.BAD_REQUEST,
          Error('Please confirm your email address before logging in.'),
          "AuthError"
        );
        return res.status(response.statusCode).json(response);
      }
  
      // Handle other errors
      const response = customResponse().error(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        Error('An error occurred during login.'),
        "AuthError"
      );
      return res.status(response.statusCode).json(response);
    }
  }

  currentUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {


    const data = await this.authService.currentUser();


    const response = customResponse().success(HttpStatusCodes.OK, data, `You are login as ${data?.email}`)
    
    return res.status(response.statusCode).json(response);
    
    } catch (err) {
      console.error(`[CurrentUserHandlerError]: ${err}`);
  
      // Handle specific Supabase auth errors
      if (err instanceof Error && err.message.includes('email_not_confirmed')) {
        const response = customResponse().error(
          HttpStatusCodes.BAD_REQUEST,
          Error('Please confirm your email address before logging in.'),
          'AuthError'
        );
        return res.status(response.statusCode).json(response);
      }
  
      // Handle case where no user is logged in
      if (err instanceof Error && err.message.includes('No user is currently logged in')) {
        const response = customResponse().error(
          HttpStatusCodes.UNAUTHORIZED,
          Error('No user is currently logged in.'),
          'AuthError'
        );
        return res.status(response.statusCode).json(response);
      }
  
      // Handle other errors
      const response = customResponse().error(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        Error('An error occurred while fetching the current user.'),
        'ServerError'
      );
      return res.status(response.statusCode).json(response);
    }
  }
}

export default AuthController;
