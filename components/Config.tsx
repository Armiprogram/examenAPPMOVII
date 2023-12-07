
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"
 export const firebaseConfig = {
  apiKey: "AIzaSyBnnFptRTEAbrDoSZD2TtWg6P8ttMFRJaQ",
  authDomain: "examen-7e4cc.firebaseapp.com",
  projectId: "examen-7e4cc",
  storageBucket: "examen-7e4cc.appspot.com",
  messagingSenderId: "720664538816",
  appId: "1:720664538816:web:fdbe4e0314a5cc5a638725"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)