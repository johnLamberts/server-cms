import { HttpStatusCodes } from "@/constants";
import { TPaginationResponse } from "@/interfaces";
import { customResponse, getRandomAvatarImage } from "@/utils";
import { NextFunction, Request, Response } from "express";
import { IMuseum } from "./museum.interface";
import { MuseumService } from "./museum.service";

export class MuseumController {
  private museumService: MuseumService | any;
  
  constructor() {
    this.museumService = new MuseumService();
   }

   addMuseumHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

      let storageRefUrl = '';
      
      // if (req.body.coverPhoto && req.body.coverPhoto.startsWith('data:image/')) {
      //   // The cover photo is Base64-encoded
      //   const base64Image = req.body.coverPhoto;
      //   const destination = `museo_rizal/museum/${Date.now()}_cover.png`; // You can adjust the file name as needed
  
      //   storageRefUrl = await uploadBase64Image(base64Image, destination);
      // }

  


      const visitorData = {
        ...req.body,
        coverPhoto:  storageRefUrl || getRandomAvatarImage()
      }


      console.log(visitorData);

      const data = await this.museumService.createMuseum(visitorData);

      console.log(data);


      const response = customResponse().success(HttpStatusCodes.OK, data, `Museum has been added.`)

      return res.status(response.statusCode).json(response);

    } catch (err) {
      console.log(`[AddMuseumControllerError]: ${err}`)
      
      next(err);

    }
  }

  getMuseumHandler = async (_req: Request, res: TPaginationResponse) => {
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
  
        responseObject.museums = results?.map((user: IMuseum) => {
          return {
            ...user,
            request: {
              type: 'GET',
              description: 'Get one museum with the ID',
              url: `http://localhost:8080/api/v1/museum/${user.museum_id}`
            }
          }
        })
  
        const success = customResponse<typeof responseObject>().success(HttpStatusCodes.OK, responseObject, "Successfully found Museums");
  
        return res.status(success.statusCode).json(success)
      } else {
        const error = customResponse().error(404, new Error('No museum found.'), "No museum found")
        return res.status(error.statusCode).json(error)
      }
    } catch (error) {
      return res.status(500).send(
        customResponse().error(404, error as Error, 'An error occurred while retrieving museum')
      )
    }
  } 
}
