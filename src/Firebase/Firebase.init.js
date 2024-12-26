// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCizsEBJyH8XXieE4_sG1DN7HYS2gQmHlU",
  authDomain: "assetflow-14.firebaseapp.com",
  projectId: "assetflow-14",
  storageBucket: "assetflow-14.appspot.com",
  messagingSenderId: "151553554737",
  appId: "1:151553554737:web:d50e582a7a35b0240ad810"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;