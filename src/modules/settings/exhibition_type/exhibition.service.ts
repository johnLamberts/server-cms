import { supabase } from "@/config";
import IExhibition from "./exhibition.interface";

export class UserService {

  /**-------------------------------------------------- */
  // Create User                                         |
  /**-------------------------------------------------- */
  async createUser (payload: IExhibition): Promise<IExhibition> {
  

    const { data: municipal, error: municipalErr } = await supabase
    .from("municipal")
    .insert({
      ...payload
    })
    .select()
    .single();

    if(municipalErr) throw  `[MunicipalErrorService]: ${JSON.stringify(municipalErr, null, 0)}`;


    console.log(municipal);

    return municipal;
    
  }

  /**-------------------------------------------------- */
  // Get User                                            |
  /**-------------------------------------------------- */
}


export default UserService;
