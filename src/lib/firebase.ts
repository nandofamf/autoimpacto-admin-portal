import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDj04E4Pqo1yWtLx9vwxv8U5GcBRLwh3AY",
  authDomain: "prueba-2f293.firebaseapp.com",
  databaseURL: "https://prueba-2f293-default-rtdb.firebaseio.com",
  projectId: "prueba-2f293",
  storageBucket: "prueba-2f293.firebasestorage.app",
  messagingSenderId: "883444062727",
  appId: "1:883444062727:web:2daae333f96990029c28a2",
  measurementId: "G-2DBWKH2KQ8"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
