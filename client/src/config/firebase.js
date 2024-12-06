import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import Firebase Storage SDK
import {getFirestore} from 'firebase/firestore'

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIpuMoGWmqqjY-Yydckefn_6DKo-MBQhg",
  authDomain: "socolled.firebaseapp.com",
  databaseURL: "https://socolled-default-rtdb.firebaseio.com",
  projectId: "socolled",
  storageBucket: "socolled.appspot.com",
  messagingSenderId: "519799880285",
  appId: "1:519799880285:web:82ab50e3e497f669c9abb4",
  measurementId: "G-HMNMBNF53G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// Firebase Storage
export const storage = getStorage(app); // Initialize Firebase Storage
export const db = getFirestore(app); 