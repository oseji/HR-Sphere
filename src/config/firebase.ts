
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlgxzZi13FCtqfUdvdg5oF4qPjNsUcMEc",
  authDomain: "hr-sphere.firebaseapp.com",
  projectId: "hr-sphere",
  storageBucket: "hr-sphere.appspot.com",
  messagingSenderId: "261394951232",
  appId: "1:261394951232:web:0435011725597c60ca83a5",
  measurementId: "G-4L109RZKVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
