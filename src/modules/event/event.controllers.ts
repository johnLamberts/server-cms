import { HttpStatusCodes } from "@/constants";
import { TPaginationResponse } from "@/interfaces";
import { customResponse, getRandomAvatarImage, uploadFile } from "@/utils";
import { NextFunction, Request, Response } from "express";
import { IEvent } from "./event.interface";
import { EventService } from "./event.service";

export class EventController {
  private eventService: EventService | any;
  
  constructor() {
    this.eventService = new EventService();
   }

   addEventHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

      let storageRefUrl = '';

      console.log(req.body);
      
      if(req.file?.filename) {
        const localFilePath = `${process.env.PWD}/public/uploads/events/${req.file?.filename}`;
        const destination = `events/${req.file.filename}`;

        storageRefUrl = await uploadFile(localFilePath, destination);
      }
      
      console.log(storageRefUrl)



      const visitorData = {
        ...req.body,
        coverPhoto:  storageRefUrl || getRandomAvatarImage()
      }


      console.log(visitorData);

      const data = await this.eventService.createEvent(visitorData);



      const response = customResponse().success(HttpStatusCodes.OK, data, `Event has been added.`)

      return res.status(response.statusCode).json(response);

    } catch (err) {
      console.log(`[AddEventControllerError]: ${err}`)
      
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
  
        responseObject.events = results?.map((user: IEvent) => {
          return {
            ...user,
            request: {
              type: 'GET',
              description: 'Get one event with the ID',
              url: `http://localhost:8080/api/v1/event/${user.event_id}`
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
