import { HttpStatusCodes } from "@/constants";
import { TPaginationResponse } from "@/interfaces";
import { customResponse } from "@/utils";
import { NextFunction, Request, Response } from "express";
import { IHome } from "./home.interface";
import { HomeService } from "./home.service";

export class HomeController {
  private homeService: HomeService | any;
  
  constructor() {
    this.homeService = new HomeService();
   }

   addHomeHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

      


      const homeEditsData = {
        ...req.body,
      }



      const data = await this.homeService.createEvent(homeEditsData);


      const response = customResponse().success(HttpStatusCodes.OK, data, `Home page has been rewarded.`)

      return res.status(response.statusCode).json(response);

    } catch (err) {
      console.log(`[AddHomeControllerError]: ${err}`)
      
      next(err);

    }
  }

  getHomeHandler = async (_req: Request, res: TPaginationResponse) => {
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
  
        responseObject.home = results?.map((user: IHome) => {
          return {
            ...user,
            request: {
              type: 'GET',
              description: 'Get one event with the ID',
              url: `http://localhost:8080/api/v1/event/${user.home_id}`
            }
          }
        })
  
        const success = customResponse<typeof responseObject>().success(HttpStatusCodes.OK, responseObject, "Successfully found Events");
  
        return res.status(success.statusCode).json(success)
      } else {
        const error = customResponse().error(404, new Error('No event found.'), "No event found")
        return res.status(error.statusCode).json(error)
      }
    } catch (error) {
      return res.status(500).send(
        customResponse().error(404, error as Error, 'An error occurred while retrieving event')
      )
    }
  } 
}
