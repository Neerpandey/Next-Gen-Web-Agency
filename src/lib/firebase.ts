import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA1LmqwkXYeZk1ws-vvO4f1Z-JuhZUEFmM",
  authDomain: "next-gen-agency-25ad4.firebaseapp.com",
  databaseURL: "https://next-gen-agency-25ad4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "next-gen-agency-25ad4",
  storageBucket: "next-gen-agency-25ad4.firebasestorage.app",
  messagingSenderId: "242235019863",
  appId: "1:242235019863:web:02fe6572df6e46eed70912"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
