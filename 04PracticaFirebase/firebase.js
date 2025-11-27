import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuYBnQ8JuDIectKiDxXDb2ym30Aa8u1Dk",
  authDomain: "conexion-b4e03.firebaseapp.com",
  projectId: "conexion-b4e03",
  storageBucket: "conexion-b4e03.firebasestorage.app",
  messagingSenderId: "26501125394",
  appId: "1:26501125394:web:7512f5082c3e43eb494fcb",
  measurementId: "G-2TTCHXWGVC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);