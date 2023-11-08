// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0JxSpYtZ3uvU3NVXMKANPu4zLibKDrRQ",
  authDomain: "szachy-d6a51.firebaseapp.com",
  projectId: "szachy-d6a51",
  storageBucket: "szachy-d6a51.appspot.com",
  messagingSenderId: "1062376784445",
  appId: "1:1062376784445:web:56e1dd176252eeae392054",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

export const db= getFirestore(app)
