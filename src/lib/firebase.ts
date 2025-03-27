import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZsvNCNy3ZuN2qz-OvS_DIR1WZLFkF8nQ",
  authDomain: "deliverz-2.firebaseapp.com",
  projectId: "deliverz-2",
  storageBucket: "deliverz-2.firebasestorage.app",
  messagingSenderId: "788902011307",
  appId: "1:788902011307:web:57d59708ffe69b77db32ee",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export const logoutUser = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    localStorage.clear();
    sessionStorage.clear();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
