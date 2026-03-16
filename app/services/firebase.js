// Firebase Configuration and Initialization
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// Your web app's Firebase configuration
// NOTE: In a real app, these would be environment variables or provided by the user.
// I will use placeholders for now, the user may need to provide their own config.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "saikal-spiritual.firebaseapp.com",
  projectId: "saikal-spiritual",
  storageBucket: "saikal-spiritual.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
