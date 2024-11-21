import { credential } from "firebase-admin";
import { getApps, initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { envConfig } from "./env.config";


const app = getApps().length === 0 ? initializeApp({
  credential: credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  }),
  storageBucket: envConfig.FIREBASE_STORAGE_BUCKET as string
}) : getApps()[0]


export const bucket = getStorage(app).bucket();



export default { bucket };
