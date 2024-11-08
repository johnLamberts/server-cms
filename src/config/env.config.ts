import dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});


export const envConfig = {
  PORT: process.env.PORT,

  SUPABASE_URL: process.env.SUPABASE_URL as string,
  SUPABASE_API_KEYS: process.env.SUPABASE_API_KEYS as string,

}

export default envConfig;
