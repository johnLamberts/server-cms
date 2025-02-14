import { supabase } from "@/config";
import { EmailService } from "../shared/email.service";
import { IVisitor } from "./visitor.interface";

export class VisitorService {

  /**-------------------------------------------------- */
  // Create User                                         |
  /**-------------------------------------------------- */
  async createVisitor (payload: IVisitor): Promise<IVisitor> {
    const { data, error: authError } = await supabase.auth.admin.createUser({
      email: payload.email,
      password: payload.password,
      user_metadata: {
        ...payload
      },
      email_confirm: true
    })


    if(authError) throw  `[AuthErrorService]: ${authError}`;

    const { data: visitor, error: userError } = await supabase
    .from("visitor")
    .insert({
      ...data.user.user_metadata,
      user_uid: data.user.id
    })
    .select()
    .single();

    if(userError) throw  `[VisitorErrorService]: ${JSON.stringify(userError, null, 0)}`;


    await EmailService.userInformationEmail(payload);

    return visitor;
    
  }

 

  /**-------------------------------------------------- */
  // Get User                                            |
  /**-------------------------------------------------- */
  
}


export default VisitorService;
