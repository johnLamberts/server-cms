import { HttpStatusCodes } from "@/constants";
import { TPaginationResponse } from "@/interfaces";
import { customResponse } from "@/utils";
import { NextFunction, Request, Response } from "express";
import BaranggayService from "./baranggay.service";
import { IBaranggay } from "./baranggayl.interface";

export class BaranggayController {
  private baranggayService: BaranggayService | any;
  
  constructor() {
    this.baranggayService = new BaranggayService();
   }

   addBaranggayHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

      // let storageRefUrl = '';

      // if(req.file?.filename) {
      //   const localFilePath = `${process.env.PWD}/public/uploads/sb_users/${req.file?.filename}`;
      //   const destination = `sb_users/${req.file.filename}`;

      //   storageRefUrl = await uploadFile(localFilePath, destination);

      // }
      

      const baranggayData = {
        ...req.body,
        // userImg: storageRefUrl
      }


      const data = await this.baranggayService.createBaranggay(baranggayData);


      const response = customResponse().success(HttpStatusCodes.OK, data, `Baranggay has been added.`)

      return res.status(response.statusCode).json(response);

    } catch (err) {
      console.log(`[AddBaranggayControllerError]: ${err}`)
      
      next(err);

    }
  }

  getBaranggaysHandler = async (_req: Request, res: TPaginationResponse) => {
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
  
        responseObject.baranggay = results?.map((baranggay: IBaranggay) => {
          return {
            ...baranggay,
            request: {
              type: 'GET',
              description: 'Get one municipal with the ID',
              url: `http://localhost:8080/api/v1/baranggay/${baranggay.baranggay_id}`
            }
          }
        })
  
        const success = customResponse<typeof responseObject>().success(HttpStatusCodes.OK, responseObject, "Successfully found baranggays");
  
        return res.status(success.statusCode).json(success)
      } else {
        const error = customResponse().error(404, new Error('No baranggay found.'), "No baranggay found")
        return res.status(error.statusCode).json(error)
      }
    } catch (error) {
      return res.status(500).send(
        customResponse().error(404, error as Error, 'An error occurred while retrieving baranggay')
      )
    }
  } 
}
