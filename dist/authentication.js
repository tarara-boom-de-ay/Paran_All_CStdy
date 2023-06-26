// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, signOut} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
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
// buttons
const googleSignInBtn = document.querySelector('.google');
const fbSignInBtn = document.querySelector('.facebook');
const tSignInBtn = document.querySelector('.twitter');

// const regBtn = document.querySelector('.reg_btn');
// const loginBtn = document.querySelector('.login_btn');

//provider
const g_provider = new GoogleAuthProvider();
const f_provider = new FacebookAuthProvider();
const t_provider = new TwitterAuthProvider();

const auth = getAuth(app);

// Export the auth object for use in other files
export default auth;

// google signin start
googleSignInBtn.addEventListener('click', () => {
    signInWithPopup(auth, g_provider).then((result) => {
      const user = result.user;
      console.log(user);
      // alert(`Hello ${user.displayName}!`);
      window.location.href = "homepage.html";
    }).catch((error) => {
      const errorMessage = error.message;
      alert(`Error: ${errorMessage}`);
    });
  });

  // fb signin start
fbSignInBtn.addEventListener('click', () => {
    signInWithPopup(auth, f_provider).then((result) => {
      const user = result.user;
      console.log(user);
      window.location.href = "homepage.html";
      // alert(`Hello ${user.displayName}!`);
    }).catch((error) => {
      const errorMessage = error.message;
      alert(`Error: ${errorMessage}`);
    });
  });
  // fb sign in end

  // twitter signin start
tSignInBtn.addEventListener('click', () => {
    signInWithPopup(auth, t_provider).then((result) => {
      const user = result.user;
      console.log(user)
      // alert(`Hello ${user.displayName}!`);
      window.location.href = "homepage.html";
    }).catch((error) => {
      const errorMessage = error.message;
      alert(`Error: ${errorMessage}`);
    });
  });
  // twitter sign in end

  //----- Logout code start	  
  document.getElementById("logout").addEventListener("click", function() {
    signOut(auth).then(() => {
        console.log('Sign-out successful.');
        alert('Sign-out successful.');
        window.location.href = "./index.html"; 
    }).catch((error) => {
        console.log('An error happened.', error);
    });	  		  
  });//----- End