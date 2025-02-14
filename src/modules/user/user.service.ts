import { supabase } from "@/config";
import { EmailService } from "../shared/email.service";
import { IUser } from "./user.interface";

/**
 * GOING TO SET-UP EMAIL TRANSPORTER HERE FOR A BIT!
 * 
 */

export class UserService {

  /**-------------------------------------------------- */
  // Create User                                         |
  /**-------------------------------------------------- */
  async createUser (payload: IUser) {

    
    const { data, error: authError } = await supabase.auth.admin.createUser({
      
      
      email: payload.email,
      password: payload.password,
      
      
      user_metadata: {
        ...payload
      },

      email_confirm: true
    })


    await supabase.auth.admin.updateUserById(data.user!.id, {
      email_confirm: true
    })

    if(authError) throw  `[AuthErrorService]: ${authError}`;

    const { data: user, error: userError } = await supabase
    .from("user")
    .insert({
      ...data.user.user_metadata,
      user_uid: data.user.id,
    })
    .select()
    .single();


    if(userError) throw  `[UserErrorService]: ${JSON.stringify(userError, null, 0)}`;



    await EmailService.userInformationEmail(payload);


    return user;
    
  }

 

  /**-------------------------------------------------- */
  // Get User                                            |
  /**-------------------------------------------------- */
  
}


export default UserService;
