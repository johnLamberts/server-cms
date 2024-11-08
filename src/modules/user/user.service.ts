import { supabase } from "@/config";
import { IUser } from "./user.interface";

export class UserService {

  /**-------------------------------------------------- */
  // Create User                                         |
  /**-------------------------------------------------- */
  async createUser (payload: IUser): Promise<IUser> {
    const { data, error: authError } = await supabase.auth.admin.createUser({
      email: payload.email,
      password: payload.password,
      user_metadata: {
        ...payload
      }
    })


    if(authError) throw  `[AuthErrorService]: ${authError}`;

    const { data: user, error: userError } = await supabase
    .from("user")
    .insert({
      ...data.user.user_metadata,
      user_uid: data.user.id
    })
    .select()
    .single();

    if(userError) throw  `[UserErrorService]: ${JSON.stringify(userError, null, 0)}`;

    return user;
    
  }

  /**-------------------------------------------------- */
  // Get User                                            |
  /**-------------------------------------------------- */
}


export default UserService;
