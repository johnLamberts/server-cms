import { credential } from "firebase-admin";
import { getApps, initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

export let bucket: any;

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

if (!firebaseConfig.projectId || !firebaseConfig.clientEmail || !firebaseConfig.privateKey) {
  throw new Error("Missing Firebase environment variables.");
}

try {
  const app =
    getApps().length === 0
      ? initializeApp({
          credential: credential.cert(firebaseConfig),
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        })
      : getApps()[0];

  console.log("Firebase initialized successfully.");

  bucket = getStorage(app).bucket();      
} catch (error) {
  console.error("[Firebase Initialization Error]", error);
  throw error;
}


export default { bucket };
