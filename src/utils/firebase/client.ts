import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration (replace with your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyDyewXNSUQSTrQhQTlTwPj1J6Wx47-ylEM",
  authDomain: "deliverz-auth.firebaseapp.com",
  projectId: "deliverz-auth",
  storageBucket: "deliverz-auth.firebasestorage.app",
  messagingSenderId: "136913221848",
  appId: "1:136913221848:web:cac322f4e4266108057fad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
