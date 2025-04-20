import { supabase } from "@/config";
import { HttpStatusCodes } from "@/constants";
import { TPaginationResponse } from "@/interfaces";
import { customResponse } from "@/utils";
import { getRandomArtifactImage } from "@/utils/get-random-artifacts.image";
import { decode } from "base64-arraybuffer";
import { NextFunction, Request, Response } from "express";
import { IArtifact } from "./artifacts-gallery.interface";
import { ArtifactService } from "./artifacts-gallery.service";

export class ArtifactController {
  private artifactService: ArtifactService | any;
  
  constructor() {
    this.artifactService = new ArtifactService();
  }

  addArtifactHandler = async (req: Request, res: Response, next: NextFunction) => {

    console.log(req.body);

    try {
      let storageRefUrl = '';
                 
                 if (req.body.artifactImg && req.body.artifactImg.startsWith('data:image/')) {
                   // The cover photo is Base64-encoded
                   const base64Image = req.body.artifactImg;
                  
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
           
      
     
               
                //  const userData = {
                //    ...req.body,
                //    artifactImg:  storageRefUrl || getRandomAvatarImage()
                //  }
      
      const artifactData = {
        ...req.body,
        artifactImg: storageRefUrl || getRandomArtifactImage(),
        featured: req.body.featured === 'true'
      };

      const data = await this.artifactService.createArtifact(artifactData);

      const response = customResponse().success(HttpStatusCodes.OK, data, `Artifact has been added.`)

      return res.status(response.statusCode).json(response);
    } catch (err) {
      console.log(`[AddArtifactControllerError]: ${err}`)
      next(err);
    }
  }

  updateArtifactHandler = async (req: Request, res: Response, next: NextFunction) => {
    console.log("updateArtifactHandler", req.body);
    try {

      let storageRefUrl = req.body.artifactImg;

      // Handle base64 image uploads
      if (req.body.artifactImg && req.body.artifactImg.startsWith('data:image/')) {
        // The image is Base64-encoded
        const base64Image = req.body.artifactImg;
        const base64Data = base64Image.includes('base64,') 
          ? base64Image.split('base64,')[1] 
          : base64Image;
      
        // Upload image to Supabase Storage
        const { data: imageData, error: uploadError } = await supabase.storage
          .from('museo_rizal')
          .upload(`artifacts/${Date.now()}-artifact.png`, decode(base64Data), {
            contentType: 'image/png'
          });
      
        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }
  
        // Get public URL for the uploaded image
        const { data: urlData } = supabase.storage
          .from('museo_rizal')
          .getPublicUrl(imageData.path);
  
        storageRefUrl = urlData.publicUrl;
      }
  
      const artifactData = {
        ...req.body,
        artifactImg: storageRefUrl,
        featured: req.body.featured === 'true'
      };

      const data = await this.artifactService.updateArtifact(artifactData.artifact_id, artifactData);

      const response = customResponse().success(HttpStatusCodes.OK, data, `Artifact has been updated.`);

      return res.status(response.statusCode).json(response);
    } catch (err) {
      console.log(`[UpdateArtifactControllerError]: ${err}`);
      next(err);
    }
  }

  updateFeaturedStatusHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { artifact_id, featured } = req.body;

      const data = await this.artifactService.updateFeaturedStatus(
        artifact_id, 
        featured === 'true' || featured === true
      );

      const response = customResponse().success(
        HttpStatusCodes.OK, 
        data, 
        `Artifact featured status has been updated.`
      );

      return res.status(response.statusCode).json(response);
    } catch (err) {
      console.log(`[UpdateFeaturedStatusControllerError]: ${err}`);
      next(err);
    }
  }

  deleteArtifactHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const data = await this.artifactService.deleteArtifact(id);

      const response = customResponse().success(
        HttpStatusCodes.OK, 
        data, 
        `Artifact has been deleted.`
      );

      return res.status(response.statusCode).json(response);
    } catch (err) {
      console.log(`[DeleteArtifactControllerError]: ${err}`);
      next(err);
    }
  }

  getOneArtifactHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const data = await this.artifactService.getOneArtifact(id);

      const response = customResponse().success(
        HttpStatusCodes.OK, 
        data, 
        `Artifact found.`
      );

      return res.status(response.statusCode).json(response);
    } catch (err) {
      console.log(`[GetOneArtifactControllerError]: ${err}`);
      next(err);
    }
  }

  getArtifactsHandler = async (_req: Request, res: TPaginationResponse) => {
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
  
        responseObject.artifacts = results?.map((artifact: IArtifact) => {
          return {
            ...artifact,
            request: {
              type: 'GET',
              description: 'Get one artifact with the ID',
              url: `${process.env.API_URL}/api/v1/artifacts/${artifact.artifact_id}`
            }
          }
        });
  
        const success = customResponse<typeof responseObject>().success(
          HttpStatusCodes.OK, 
          responseObject, 
          "Successfully found artifacts"
        );
  
        return res.status(success.statusCode).json(success);
      } else {
        const error = customResponse().error(404, new Error('No artifacts found.'), "No artifacts found");
        return res.status(error.statusCode).json(error);
      }
    } catch (error) {
      return res.status(500).send(
        customResponse().error(404, error as Error, 'An error occurred while retrieving artifacts')
      );
    }
  }
}

export default ArtifactController;
