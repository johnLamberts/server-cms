import { createClient } from "@supabase/supabase-js";
import envConfig from "./env.config";

export const supabase = createClient(
  envConfig.SUPABASE_URL,
  envConfig.SUPABASE_API_KEYS,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,  
    }
  }
);


export default supabase;
