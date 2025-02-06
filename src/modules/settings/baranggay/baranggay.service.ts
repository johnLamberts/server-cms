import { supabase } from "@/config";
import { IBaranggay } from "./baranggayl.interface";

export class BaranggayService {

  /**-------------------------------------------------- */
  // Create User                                         |
  /**-------------------------------------------------- */
  async createBaranggay (payload: IBaranggay): Promise<IBaranggay> {
  

    const { data: baranggay, error: baranggayErr } = await supabase
    .from("baranggay")
    .insert({
      ...payload
    })
    .select()
    .single();

    if(baranggayErr) throw  `[BaranggayErrorService]: ${JSON.stringify(baranggayErr, null, 0)}`;


    console.log(baranggay);

    return baranggay;
    
  }

  /**-------------------------------------------------- */
  // Get User                                            |
  /**-------------------------------------------------- */
}


export default BaranggayService;
