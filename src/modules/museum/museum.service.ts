import { supabase } from "@/config";
import { IMuseum } from "./museum.interface";

export class MuseumService {

  /**-------------------------------------------------- */
  // Create Museum                                         |
  /**-------------------------------------------------- */
  async createMuseum (payload: IMuseum): Promise<IMuseum> {

    console.log('service: ', payload )


    const { data: museum, error: museumError } = await supabase
    .from("museums")
    .insert(payload)
    .select()
    .single();

    if(museumError) throw  `[MuseumErrorService]: ${JSON.stringify(museumError, null, 0)}`;

    return museum;
    
  }

 

  /**-------------------------------------------------- */
  // Get User                                            |
  /**-------------------------------------------------- */
  
}


export default MuseumService;
