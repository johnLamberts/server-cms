import { supabase } from "@/config";
import { IMunicipal } from "./municipal.interface";

export class UserService {

  /**-------------------------------------------------- */
  // Create User                                         |
  /**-------------------------------------------------- */
  async createUser (payload: IMunicipal): Promise<IMunicipal> {
  

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
