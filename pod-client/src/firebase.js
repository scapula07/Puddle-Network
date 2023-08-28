// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkgLe7FW6b5SY_n8id_r5rGlBysgNr1lU",
  authDomain: "scapula-57ce3.firebaseapp.com",
  projectId: "scapula-57ce3",
  storageBucket: "scapula-57ce3.appspot.com",
  messagingSenderId: "875575930594",
  appId: "1:875575930594:web:7b7bffa7c5a0d890c878bb",
  measurementId: "G-3Z5T6FN1ZE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore()