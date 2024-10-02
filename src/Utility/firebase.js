// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Auth puropse
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4hvU1YdfZzLMOtsVl5I92VVDM_6d7BsQ",
  authDomain: "netflix-clone-2024-79f20.firebaseapp.com",
  projectId: "netflix-clone-2024-79f20",
  storageBucket: "netflix-clone-2024-79f20.appspot.com",
  messagingSenderId: "563890530990",
  appId: "1:563890530990:web:7bf5496bcce5ed03dedb3f",
};

// Initialize Firebase
const app =firebase.initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const db=app.firestore()