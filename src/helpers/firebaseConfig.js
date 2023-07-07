// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSxvgcXxrz96c0Slg_BBZeJ-hYiVeEIU8",
  authDomain: "bdsr-c02ec.firebaseapp.com",
  databaseURL: "https://bdsr-c02ec-default-rtdb.firebaseio.com",
  projectId: "bdsr-c02ec",
  storageBucket: "bdsr-c02ec.appspot.com",
  messagingSenderId: "491365232955",
  appId: "1:491365232955:web:80631204cf1c037cc2c71e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;