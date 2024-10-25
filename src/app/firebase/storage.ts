import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Importar Storage

// Definir el tipo para la configuración de Firebase
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string; // measurementId es opcional
}

// Tu configuración de Firebase
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyB4nDmHkp9S_t7YxNPbFZU5-ek2cL_I8pg",
  authDomain: "melodytrackerimages.firebaseapp.com",
  projectId: "melodytrackerimages",
  storageBucket: "melodytrackerimages.appspot.com",
  messagingSenderId: "420975529922",
  appId: "1:420975529922:web:f714fcc33f5501ac80d05b",
  measurementId: "G-1TKWYVC66W"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar Storage
const storage = getStorage(app);