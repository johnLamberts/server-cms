import { supabase } from "@/config";
import { IAuthentication } from "./auth.interface";

export class AuthService {
  constructor() { }

  async loginUserWithPassword(payload: IAuthentication) {

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      })
  
  
      if(authError) throw `[AuthErrorService]: ${JSON.stringify(authError, null, 0)}`;
  
      console.log(data.user)
      return data.user.user_metadata;
    } catch (err) {
      console.log(err)
    }
 
  }


  async currentUser() {

    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching current user:', error.message);
        return null;
      }
    
      return user;

    } catch (err) {
      console.log(err)
    }
 
  }
}


export default AuthService;
