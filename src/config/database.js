// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg7hK7H5hCSp39zFQge8xtdviEtSZ52Jk",
  authDomain: "kinetic-eefef.firebaseapp.com",
  projectId: "kinetic-eefef",
  storageBucket: "kinetic-eefef.appspot.com",
  messagingSenderId: "814079766585",
  appId: "1:814079766585:web:ba3e12776bbb8c39155de8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;