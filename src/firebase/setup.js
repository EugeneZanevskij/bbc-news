import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHETt888a6rMpLMvgMornDm0wx08FJq2k",
  authDomain: "bbc-clone-1c7e6.firebaseapp.com",
  projectId: "bbc-clone-1c7e6",
  storageBucket: "bbc-clone-1c7e6.appspot.com",
  messagingSenderId: "698222650467",
  appId: "1:698222650467:web:7650bfd6e44fd54c67c456",
  measurementId: "G-9QFCVKYY4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const db = getFirestore(app);