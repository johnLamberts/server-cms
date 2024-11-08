import { HttpStatusCodes } from "@/constants";
import { customResponse } from "@/utils";
import { NextFunction, Request, Response } from "express";
import UserService from "./user.service";

export class UserController {
  private userService: UserService | any;
  
  constructor() {
    this.userService = new UserService();
   }

   addUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

      // let storageRefUrl = '';

      // if(req.file?.filename) {
      //   const localFilePath = `${process.env.PWD}/public/uploads/sb_users/${req.file?.filename}`;
      //   const destination = `sb_users/${req.file.filename}`;

      //   storageRefUrl = await uploadFile(localFilePath, destination);

      // }
      

      const userData = {
        ...req.body,
        // userImg: storageRefUrl
      }


      const data = await this.userService.createUser(userData);


      const response = customResponse().success(HttpStatusCodes.OK, data, `Students has been added.`)

      return res.status(response.statusCode).json(response);

    } catch (err) {
      console.log(`[AddStudentControllerError]: ${err}`)
      
      next(err);

    }
  }
}
