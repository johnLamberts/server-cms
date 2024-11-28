import { supabase } from "@/config";
import { IEvent } from "./event.interface";

export class EventService {

  /**-------------------------------------------------- */
  // Create Museum                                         |
  /**-------------------------------------------------- */
  async createEvent (payload: IEvent): Promise<IEvent> {



    const { data: event, error: eventError } = await supabase
    .from("events")
    .insert(payload)
    .select()
    .single();

    if(eventError) throw  `[EventErrorService]: ${JSON.stringify(eventError, null, 0)}`;

    return event;
    
  }

 

  /**-------------------------------------------------- */
  // Get User                                            |
  /**-------------------------------------------------- */
  
}


export default EventService;
