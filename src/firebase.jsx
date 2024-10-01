import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Changes
import { getFirestore } from "firebase/firestore";
// 

const firebaseConfig = {
    apiKey: "AIzaSyD4Pgwz2u3Tm-_i998xnzL29bCLphxX6O0",
    authDomain: "sewift-app.firebaseapp.com",
    projectId: "sewift-app",
    storageBucket: "sewift-app.appspot.com",
    messagingSenderId: "644231261054",
    appId: "1:644231261054:web:35d4798a1817948e47612f",
    measurementId: "G-5VMYB2V6LQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// Changes
export const db = getFirestore(app);
// 