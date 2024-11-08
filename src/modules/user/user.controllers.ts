import { HttpStatusCodes } from "@/constants";
import { TPaginationResponse } from "@/interfaces";
import { customResponse } from "@/utils";
import { NextFunction, Request, Response } from "express";
import { IUser } from "./user.interface";
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

  getUsersHandler = async (_req: Request, res: TPaginationResponse) => {
    try {
      if(res.paginatedResults) {
        const { results, next, previous, currentPage, totalDocs, totalPages, lastPage } = res.paginatedResults;
  
        const responseObject: any = {
          totalDocs: totalDocs || 0,
          totalPages: totalPages || 0,
          lastPage: lastPage || 0,
          count: results?.length || 0,
          currentPage: currentPage || 0,
        };
  
        if(next) {
          responseObject.nextPage = next;
        }
        if(previous) {
          responseObject.prevPage = previous;
        }
  
        responseObject.users = results?.map((user: IUser) => {
          return {
            ...user,
            request: {
              type: 'GET',
              description: 'Get one phamarcy with the ID',
              url: `http://localhost:8080/api/v1/user/${user.user_uid}`
            }
          }
        })
  
        const success = customResponse<typeof responseObject>().success(HttpStatusCodes.OK, responseObject, "Successfully found medicines");
  
        return res.status(success.statusCode).json(success)
      } else {
        const error = customResponse().error(404, new Error('No medicine found.'), "No medicine found")
        return res.status(error.statusCode).json(error)
      }
    } catch (error) {
      return res.status(500).send(
        customResponse().error(404, error as Error, 'An error occurred while retrieving medicine')
      )
    }
  } 
}
