// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFhurCBcXvd8JvhkZsKgK6A9k8wyHK1xQ",
  authDomain: "reactnative-a2618.firebaseapp.com",
  projectId: "reactnative-a2618",
  storageBucket: "reactnative-a2618.firebasestorage.app",
  messagingSenderId: "1058952105080",
  appId: "1:1058952105080:web:5f21452eaaf1e8d1ad318d",
  measurementId: "G-2TZFMM57VX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app)