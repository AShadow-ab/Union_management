// Import Firebase core
import { initializeApp } from "firebase/app";

// Import Firebase services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2-stoxx_yN6eqv2Z9LdTCxxYzie10yrw",
  authDomain: "unionportal.firebaseapp.com",
  projectId: "unionportal",
  storageBucket: "unionportal.firebasestorage.app",
  messagingSenderId: "1063339588204",
  appId: "1:1063339588204:web:e03b199759f8b24e3ab649",
  measurementId: "G-D8F93L15BG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);