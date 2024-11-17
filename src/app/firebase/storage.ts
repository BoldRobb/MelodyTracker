// storage.ts
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Importar funciones necesarias

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

// Inicializar Storage
const storage = getStorage(app);

// Función para subir archivos a Firebase Storage
export const uploadFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Crear una referencia a la ubicación en Storage
    const storageRef = ref(storage, `uploads/${file.name}`);
    
    // Subir el archivo
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Escuchar los cambios de estado de la carga
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        reject(error); // Manejar el error en caso de falla
      },
      () => {
        // Obtener la URL de descarga cuando la carga esté completa
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL); // Resolver con la URL de descarga
        });
      }
    );
  });
};
