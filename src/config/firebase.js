// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAXniiDf0zL-HV5TBFKomo8kFRyI01_Yk",
  authDomain: "proyecto-final-talentote-13e0a.firebaseapp.com",
  projectId: "proyecto-final-talentote-13e0a",
  storageBucket: "proyecto-final-talentote-13e0a.firebasestorage.app",
  messagingSenderId: "464260891135",
  appId: "1:464260891135:web:edba5eb85c1d15636de7ca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
