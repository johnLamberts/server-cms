import { supabase } from "@/config";
import { IExhibit } from "./exhibits.interface";

export class ExhibitService {

  /**-------------------------------------------------- */
  // Create Exhibit                                         |
  /**-------------------------------------------------- */
  async createExhibit (payload: IExhibit): Promise<IExhibit> {



    const { data: exhibit, error: exhibitError } = await supabase
    .from("exhibits")
    .insert(payload)
    .select()
    .single();

    if(exhibitError) throw  `[ExhibitErrorService]: ${JSON.stringify(exhibitError, null, 0)}`;

    return exhibit;
    
  }

 

  /**-------------------------------------------------- */
  // Get User                                            |
  /**-------------------------------------------------- */
  
}


export default ExhibitService;
