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
  // Register User                                         |
  /**-------------------------------------------------- */
  async registerVisitor (payload: IVisitor): Promise<IVisitor> {
    const { data, error: authError } = await supabase.auth.admin.createUser({
      email: payload.email,
      password: payload.password,
      user_metadata: {
        ...payload, 
        status: 'pending'
      },
      email_confirm: true
    })


    if(authError) throw  `[AuthErrorService]: ${authError}`;

    const { data: visitor, error: userError } = await supabase
    .from("visitor")
    .insert({
      ...data.user.user_metadata,
      status: 'pending',
      user_uid: data.user.id
    })
    .select()
    .single();

    if(userError) throw  `[VisitorErrorService]: ${JSON.stringify(userError, null, 0)}`;


    await EmailService.accountRegisterInformation(payload);

    return visitor;
    
  }
 
  /**-------------------------------------------------- */
  // Update Visitor                                         |
  /**-------------------------------------------------- */
  async updateVisitor (payloadId: string,payload: IVisitor): Promise<IVisitor> {
    try {
      // Log incoming payload for debugging
      console.log("Update Visitor Payload:", payload);
  
      // Update auth user first
      const { data, error: authError } = await supabase.auth.admin.updateUserById(payloadId, {
        email: payload.email,
        password: payload.password, 
        user_metadata: {
          ...payload
        },
      });
  
      if (authError) throw `[AuthErrorService]: ${authError}`;
  
      // Instead of using visitor_id which is causing issues, use user_uid
      const { data: visitor, error: userError } = await supabase
        .from("visitor")
        .update({
          ...data.user.user_metadata,
        })
        .eq("user_uid", payload.user_uid) // Use user_uid instead of visitor_id
        .single();
  
      console.log("Update result:", visitor);
      console.error("Update error if any:", userError);
  
      if (userError) throw `[VisitorErrorService]: ${JSON.stringify(userError, null, 0)}`;
  
      await EmailService.userModifyProfile(payload);
  
      return visitor;
    } catch (error) {
      console.error("Error in updateVisitor:", error);
      throw error;
    }
  }

   /**-------------------------------------------------- */
  // Update Visitor                                         |
  /**-------------------------------------------------- */
  async updateApprovedVisitorStatus (payloadId: string, payload: IVisitor): Promise<IVisitor> {
    const { data, error: authError } = await supabase.auth.admin.updateUserById(payloadId, {
      user_metadata: {
        status: 'Active'
      },
    })


    if(authError) throw  `[AuthErrorService]: ${authError}`;

    const { data: visitor, error: userError } = await supabase
    .from("visitor")
    .update({
      status: 'Active'

    })
    .eq("user_uid", payload.user_uid)
    .single();

    if(userError) throw  `[VisitorErrorService]: ${JSON.stringify(userError, null, 0)}`;


    await EmailService.accountApprovedEmail(payload);

    return visitor;
    
  }

  /**-------------------------------------------------- */
  // Get User                                            |
  /**-------------------------------------------------- */
  
}


export default VisitorService;
