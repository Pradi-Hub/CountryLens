// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCEmf0uW9TmSiISa5AoBiqcbtBUsV85DEU",
    authDomain: "countrylens-e725b.firebaseapp.com",
    projectId: "countrylens-e725b",
    storageBucket: "countrylens-e725b.firebasestorage.app",
    messagingSenderId: "940963045493",
    appId: "1:940963045493:web:523184cc41dc0e6598983c",
    measurementId: "G-R1S3CYLQF0"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();