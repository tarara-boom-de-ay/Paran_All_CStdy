// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeS2bGupdBmAUB6ECSwwySQICjU1HLgkE",
  authDomain: "paranfinal.firebaseapp.com",
  projectId: "paranfinal",
  storageBucket: "paranfinal.appspot.com",
  messagingSenderId: "539502701633",
  appId: "1:539502701633:web:a16d3f3510205bdb05aac0",
  measurementId: "G-21RW4W5PTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app);