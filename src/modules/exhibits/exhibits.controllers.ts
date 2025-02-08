import { supabase } from "@/config";
import { HttpStatusCodes } from "@/constants";
import { TPaginationResponse } from "@/interfaces";
import { customResponse, getRandomAvatarImage } from "@/utils";
import { decode } from 'base64-arraybuffer';
import { NextFunction, Request, Response } from "express";
import { IExhibit } from "./exhibits.interface";
import { ExhibitService } from "./exhibits.service";

export class ExhibitController {
  private exhibitService: ExhibitService | any;
  
  constructor() {
    this.exhibitService = new ExhibitService();
   }

   addExhibitHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {

      let storageRefUrl = '';
      
      if (req.body.coverPhoto && req.body.coverPhoto.startsWith('data:image/')) {
        // The cover photo is Base64-encoded
        const base64Image = req.body.coverPhoto;
       
        const base64Data = base64Image.includes('base64,') 
        ? base64Image.split('base64,')[1] 
        : base64Image
  
      // Upload image to Supabase Storage
      const { data: imageData, error: uploadError } = await supabase.storage
        .from('museo_rizal')
        .upload(`exhibits/${Date.now()}-cover.png`, decode(base64Data), {
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

  

    

      const visitorData = {
        ...req.body,
        coverPhoto:  storageRefUrl || getRandomAvatarImage()
      }


      console.log(visitorData);

      const data = await this.exhibitService.createExhibit(visitorData);

      console.log(data);


      const response = customResponse().success(HttpStatusCodes.OK, data, `Exhibit has been added.`)

      return res.status(response.statusCode).json(response);

    } catch (err) {
      console.log(`[AddExhibitControllerError]: ${err}`)
      
      next(err);

    }
  }

  getExhibitHandler = async (_req: Request, res: TPaginationResponse) => {
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
  
        responseObject.museums = results?.map((user: IExhibit) => {
          return {
            ...user,
            request: {
              type: 'GET',
              description: 'Get one exhibit with the ID',
              url: `http://localhost:8080/api/v1/exhibit/${user.exhibit_id}`
            }
          }
        })
  
        const success = customResponse<typeof responseObject>().success(HttpStatusCodes.OK, responseObject, "Successfully found Exhibits");
  
        return res.status(success.statusCode).json(success)
      } else {
        const error = customResponse().error(404, new Error('No exhibit found.'), "No exhibit found")
        return res.status(error.statusCode).json(error)
      }
    } catch (error) {
      return res.status(500).send(
        customResponse().error(404, error as Error, 'An error occurred while retrieving exhibit')
      )
    }
  } 
}
