// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAeS2bGupdBmAUB6ECSwwySQICjU1HLgkE",
    authDomain: "paranfinal.firebaseapp.com",
    projectId: "paranfinal",
    databaseURL: "https://paranfinal-default-rtdb.asia-southeast1.firebasedatabase.app", // Update this line
    storageBucket: "paranfinal.appspot.com",
    messagingSenderId: "539502701633",
    appId: "1:539502701633:web:a16d3f3510205bdb05aac0",
    measurementId: "G-21RW4W5PTR"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);

const db = getDatabase(app);
export { db };

var temperatureElement = document.getElementById("Temperature");
var humidityElement = document.getElementById("Humidity");

function speak(message) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    synth.speak(utterance);
}

// Read data from Firebase
onValue(ref(db, "/DHT11"), (snapshot) => {
    var data = snapshot.val();

    // store data from database
    const temp = data.Temperature;
    const hum = data.Humidity;

    // Display data on the web app
    temperatureElement.innerText = temp + "°C";
    humidityElement.innerText =  hum + "%";

    if (temp > 30) {
        speak("Hot kaayo ko");
    }
    if (hum > 50) {
        speak("Gipaningot nako");
    }
});