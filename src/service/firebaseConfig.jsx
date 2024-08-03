// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8d7dHo2gNeHNRccmhkVbW08gnOf8zyHY",
  authDomain: "travel-planner-3d0da.firebaseapp.com",
  projectId: "travel-planner-3d0da",
  storageBucket: "travel-planner-3d0da.appspot.com",
  messagingSenderId: "283171504813",
  appId: "1:283171504813:web:a610bca54acaa3a4673c24",
  measurementId: "G-88R2SYQ1DK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
