import { supabase } from "@/config";
import { IAuthentication } from "./auth.interface";

export class AuthService {
  constructor() { }

  async loginUserWithPassword(payload: IAuthentication) {

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: payload.email,
        password: payload.password
      })
  
  
      if(authError) throw `[AuthErrorService]: ${JSON.stringify(authError, null, 0)}`;
  
  
      return data.user.user_metadata;
    } catch (err) {
      console.log(err)
    }
 
  }
}


export default AuthService;
