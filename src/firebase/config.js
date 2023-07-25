import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8zmu1auyAaHJyZDAUhqeFZwANm8vo5PQ",
  authDomain: "yo--recipe.firebaseapp.com",
  projectId: "yo--recipe",
  storageBucket: "yo--recipe.appspot.com",
  messagingSenderId: "928561961193",
  appId: "1:928561961193:web:2dc455eb6fd139677af878",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
