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
    // Update Visitor                                      |
    /**-------------------------------------------------- */
    async updateUser (payload: IUser) {

      console.log(payload);

      const { data: userData, error: userError} = await supabase.from("user").select("*").eq("user_id", payload.user_id).single();

      if(userError) throw  `[FetchUserErrorService]: ${userError}`;

      const { data: userAuth, error: authError } = await supabase.auth.admin.updateUserById(userData.user_uid, {
        email: payload.email,
        password: payload.password,
        user_metadata: {
          ...payload
        },
      })
  
  
      if(authError) throw  `[AuthErrorService]: ${authError}`;
      
      console.log(userAuth.user.user_metadata);

      const { data: user, error: userAddingError } = await supabase
      .from("user")
      .update({
        ...userAuth.user.user_metadata,
      })
      .eq("user_id", payload.user_id)
      .single();
  
      if(userAddingError) throw  `[AddingUserErrorService]: ${JSON.stringify(userAddingError, null, 0)}`;
  
  
      await EmailService.userModifyProfile(payload);
  
      return user;
      
    }


    /**-------------------------------------------------- */
    // Update User Password                                |
    /**-------------------------------------------------- */
    async updateUserPassword (payload: IUser) {

      const { data: userData, error: userError} = await supabase.from("user").select("*").eq("user_id", payload.user_id).single();

      if(userError) throw  `[FetchUserErrorService]: ${JSON.stringify(userError, null, 0)}`;

      const { data: userAuth, error: authError } = await supabase.auth.admin.updateUserById(userData.user_uid, {
        password: payload.password,
      })
  
      if(authError) throw  `[AuthUpdatingPasswordErrorService]: ${authError}`;
      
      
      const { data: user, error: userAddingError } = await supabase
      .from("user")
      .update({
        password: payload.password
      })
      .eq("user_id", payload.user_id)
      .single();
  
      if(userAddingError) throw  `[UpdatingUserPasswordErrorService]: ${JSON.stringify(userAddingError, null, 0)}`;
  
      await EmailService.userModifyPassword(payload);
  
      return user;
    }

  

  /**-------------------------------------------------- */
  // Get User                                            |
  /**-------------------------------------------------- */
  
}


export default UserService;
