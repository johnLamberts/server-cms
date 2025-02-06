import dotenv from "dotenv";

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});


export const envConfig = {
  PORT: process.env.PORT || 8667,

  SUPABASE_URL: process.env.SUPABASE_URL as string,
  SUPABASE_API_KEYS: process.env.SUPABASE_API_KEYS as string,

  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID as string,
  FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL as string,
  FIREBASE_PRIVATE_KEY:  process.env.PRIVATE_KEY,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET as string,


  // EMAIL TRANSPOTER ENV..
  SENDER_ID: process.env.SENDER_ID as string,
  EMAIL_TOKEN: process.env.EMAIL_TOKEN as string,

  // TEST EMAIL TEMP
  TEST_AUTH_EMAIL: process.env.TEST_AUTH_EMAIL as string,

}

export default envConfig;
