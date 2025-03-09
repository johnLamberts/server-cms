import { supabase } from "@/config";
import { HttpStatusCodes } from "@/constants";
import { TPaginationResponse } from "@/interfaces";
import { customResponse, getRandomAvatarImage } from "@/utils";
import { decode } from "base64-arraybuffer";
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

      let storageRefUrl = '';
            
            if (req.body.userImg && req.body.userImg.startsWith('data:image/')) {
              // The cover photo is Base64-encoded
              const base64Image = req.body.coverPhoto;
             
              const base64Data = base64Image.includes('base64,') 
              ? base64Image.split('base64,')[1] 
              : base64Image
        
            // Upload image to Supabase Storage
            const { data: imageData, error: uploadError } = await supabase.storage
              .from('museo_rizal')
              .upload(`users/${Date.now()}-cover.png`, decode(base64Data), {
                contentType: 'image/png'
              })
        
              if (uploadError) {
                throw new Error(`Error uploading image: ${uploadError.message}`)
              }
      
              // Get public URL for the uploaded image
              const { data: urlData } = await supabase.storage
              .from('museo_rizal')
              .getPublicUrl(imageData.path)
      
      
              storageRefUrl = urlData.publicUrl;
      
            }
      
 

          
            const userData = {
              ...req.body,
              userImg:  storageRefUrl || getRandomAvatarImage()
            }

      const data = await this.userService.createUser(userData);


      const response = customResponse().success(HttpStatusCodes.OK, data, `Students has been added.`)

      return res.status(response.statusCode).json(response);

    } catch (err) {
      console.log(`[AddStudentControllerError]: ${err}`)
      
      next(err);

    }
  }

  updateUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {


      let storageRefUrl = req.body.userImg;

        
                if (req.body.userImg && req.body.userImg.startsWith('data:image/')) {
                  // The cover photo is Base64-encoded
                  const base64Image = req.body.userImg;
                  const base64Data = base64Image.includes('base64,') 
                  ? base64Image.split('base64,')[1] 
                  : base64Image
            
                // Upload image to Supabase Storage
                const { data: imageData, error: uploadError } = await supabase.storage
                  .from('museo_rizal')
                  .upload(`user/${Date.now()}-cover.png`, decode(base64Data), {
                    contentType: 'image/png'
                  })
            
                  if (uploadError) {
                    throw new Error(`Error uploading image: ${uploadError.message}`)
                  }
          
                  // Get public URL for the uploaded image
                  const { data: urlData } = await supabase.storage
                  .from('museo_rizal')
                  .getPublicUrl(imageData.path)
          
          
                  storageRefUrl = urlData.publicUrl;
          
                }
          
                console.log(storageRefUrl)
                
              
                const userData = {
                  ...req.body,
                  userImg:  storageRefUrl || getRandomAvatarImage()
                }
    

      const data = await this.userService.updateUser(userData);


      const response = customResponse().success(HttpStatusCodes.OK, data, `User has been updated.`)

      return res.status(response.statusCode).json(response);

    } catch (err) {
      console.log(`[UpdateUserControllerError]: ${err}`)
      
      next(err);

    }
  }

  updateUserPasswordHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
      const userData = {
        ...req.body,
      }

      console.log(userData);
    

      const data = await this.userService.updateUserPassword(userData);

      const response = customResponse().success(HttpStatusCodes.OK, data, `User password has been updated.`)

      return res.status(response.statusCode).json(response);

    } catch (err) {
      console.log(`[UpdateUserPasswordControllerError]: ${err}`)
      
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
