import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY ?? process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN ?? process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID ?? process.env.FIREBASE_PROJECT_ID,
  storageBucket:
    process.env.STORAGE_BUCKET ?? process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.MESSAGING_SENDER_ID ?? process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.APP_ID ?? process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
