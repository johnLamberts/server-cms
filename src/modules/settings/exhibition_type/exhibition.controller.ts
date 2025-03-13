import { HttpStatusCodes } from "@/constants";
import { TPaginationResponse } from "@/interfaces";
import { customResponse } from "@/utils";
import { Request } from "express";
import IExhibition from "./exhibition.interface";
import MunicipalService from "./exhibition.service";

export class MunicipalController {
  private municipalService: MunicipalService | any;
  
  constructor() {
    this.municipalService = new MunicipalService();
   }

  //  addMunicipalHandler = async (req: Request, res: Response, next: NextFunction) => {
  //   try {

  //     // let storageRefUrl = '';

  //     // if(req.file?.filename) {
  //     //   const localFilePath = `${process.env.PWD}/public/uploads/sb_users/${req.file?.filename}`;
  //     //   const destination = `sb_users/${req.file.filename}`;

  //     //   storageRefUrl = await uploadFile(localFilePath, destination);

  //     // }
      

  //     const municipalData = {
  //       ...req.body,
  //       // userImg: storageRefUrl
  //     }


  //     const data = await this.municipalService.createUser(municipalData);


  //     const response = customResponse().success(HttpStatusCodes.OK, data, `Municipal has been added.`)

  //     return res.status(response.statusCode).json(response);

  //   } catch (err) {
  //     console.log(`[AddMunicipalControllerError]: ${err}`)
      
  //     next(err);

  //   }
  // }

  getExhibitionsHandler = async (_req: Request, res: TPaginationResponse) => {
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
  
        responseObject.exhibition = results?.map((municipal: IExhibition) => {
          return {
            ...municipal,
            request: {
              type: 'GET',
              description: 'Get one exhibition with the ID',
              url: `http://localhost:8080/api/v1/municipal/${municipal.exhibition_id}`
            }
          }
        })
  
        const success = customResponse<typeof responseObject>().success(HttpStatusCodes.OK, responseObject, "Successfully found exhibiiton");
  
        return res.status(success.statusCode).json(success)
      } else {
        const error = customResponse().error(404, new Error('No exhibition found.'), "No exhibition found")
        return res.status(error.statusCode).json(error)
      }
    } catch (error) {
      return res.status(500).send(
        customResponse().error(404, error as Error, 'An error occurred while retrieving exhibition')
      )
    }
  } 
}
