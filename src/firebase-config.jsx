
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8RIEgd3vrV3dFByfa7Enb25XyT4d4R1M",
  authDomain: "react-todo-app-ca65a.firebaseapp.com",
  projectId: "react-todo-app-ca65a",
  storageBucket: "react-todo-app-ca65a.appspot.com",
  messagingSenderId: "285517010155",
  appId: "1:285517010155:web:333879207274baaec41aae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
