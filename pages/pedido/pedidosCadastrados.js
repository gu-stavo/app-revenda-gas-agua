// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // For persistent authentication in React Native
import AsyncStorage from "@react-native-async-storage/async-storage"; // For authentication state persistence
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBexhB4xIr3fCCpKBSsq86Aal7wdeP4ryw",
  authDomain: "projetotg-9df16.firebaseapp.com",
  projectId: "projetotg-9df16",
  storageBucket: "projetotg-9df16.appspot.com",
  messagingSenderId: "164198686109",
  appId: "1:164198686109:web:ec68671ebeddcce97ee374",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);

// Remove a exportação duplicada para evitar conflito
