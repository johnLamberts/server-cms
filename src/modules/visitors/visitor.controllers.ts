import { HttpStatusCodes } from "@/constants";
import { TPaginationResponse } from "@/interfaces";
import { customResponse, getRandomAvatarImage, uploadFile } from "@/utils";
import { NextFunction, Request, Response } from "express";
import { IVisitor } from "./visitor.interface";
import { VisitorService } from "./visitor.service";

export class VisitorController {
  private visitorService: VisitorService | any;
  
  constructor() {
    this.visitorService = new VisitorService();
   }

   addVisitorHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

      let storageRefUrl = '';
      
      if(req.file?.filename) {
        const localFilePath = `${process.env.PWD}/public/uploads/visitor/${req.file?.filename}`;
        const destination = `museo_rizal/visitor/${req.file.filename}`;

        storageRefUrl = await uploadFile(localFilePath, destination);
      }
      

      const visitorData = {
        ...req.body,
        visitorImg:  storageRefUrl || getRandomAvatarImage()
      }


      const data = await this.visitorService.createVisitor(visitorData);


      const response = customResponse().success(HttpStatusCodes.OK, data, `Visitor has been added.`)

      return res.status(response.statusCode).json(response);

    } catch (err) {
      console.log(`[AddVisitorControllerError]: ${err}`)
      
      next(err);

    }
  }

  getVisitorHandler = async (_req: Request, res: TPaginationResponse) => {
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
  
        responseObject.visitors = results?.map((user: IVisitor) => {
          return {
            ...user,
            request: {
              type: 'GET',
              description: 'Get one phamarcy with the ID',
              url: `http://localhost:8080/api/v1/visitor/${user.visitor_id}`
            }
          }
        })
  
        const success = customResponse<typeof responseObject>().success(HttpStatusCodes.OK, responseObject, "Successfully found visitors");
  
        return res.status(success.statusCode).json(success)
      } else {
        const error = customResponse().error(404, new Error('No visitor found.'), "No visitor found")
        return res.status(error.statusCode).json(error)
      }
    } catch (error) {
      return res.status(500).send(
        customResponse().error(404, error as Error, 'An error occurred while retrieving visitor')
      )
    }
  } 
}
