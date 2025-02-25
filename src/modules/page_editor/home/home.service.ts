import { supabase } from "@/config";
import { IHome } from "./home.interface";

export class HomeService {

  /**-------------------------------------------------- */
  // Create Museum                                         |
  /**-------------------------------------------------- */
  async createEvent (payload: IHome): Promise<IHome> {



    const { data: home, error: homeError } = await supabase
    .from("home_editor")
    .insert(payload)
    .select()
    .single();

    if(homeError) throw  `[HomeErrorService]: ${JSON.stringify(homeError, null, 0)}`;

    return home;
    
  }

 

  /**-------------------------------------------------- */
  // Get User                                            |
  /**-------------------------------------------------- */
  
}


export default HomeService;
