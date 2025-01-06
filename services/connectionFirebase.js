import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence } from "firebase/auth"; // Para autenticação
import { getFirestore } from "firebase/firestore"; // Para Firestore
import { getStorage } from "firebase/storage"; // Para Storage
import { getApp, getApps } from "firebase/app"; // Para verificar se o Firebase já foi inicializado
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para persistência

const firebaseConfig = {
  apiKey: "AIzaSyBexhB4xIr3fCCpKBSsq86Aal7wdeP4ryw",
  authDomain: "projetotg-9df16.firebaseapp.com",
  projectId: "projetotg-9df16",
  storageBucket: "projetotg-9df16.appspot.com",
  messagingSenderId: "164198686109",
  appId: "1:164198686109:web:ec68671ebeddcce97ee374"
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Inicialize a autenticação
const auth = getAuth(app);

if (typeof window !== "undefined") {
  auth.setPersistence(browserLocalPersistence).catch((error) => {
    console.error("Erro ao definir persistência no Web:", error);
  });
}

export const db = getFirestore(app);
export const storage = getStorage(app);
export { auth };
