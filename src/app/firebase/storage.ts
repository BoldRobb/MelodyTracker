import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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

// Función para convertir la imagen a formato WebP
const convertToWebP = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          return reject(new Error("No se pudo inicializar el contexto del canvas."));
        }

        // Ajustar el tamaño del canvas al tamaño de la imagen
        canvas.width = img.width;
        canvas.height = img.height;

        // Dibujar la imagen en el canvas
        ctx.drawImage(img, 0, 0);

        // Convertir el contenido del canvas a WebP
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob); // Retornar el Blob resultante
            } else {
              reject(new Error("No se pudo convertir la imagen a WebP."));
            }
          },
          'image/webp', // Especificar el formato WebP
          0.8 // Calidad de compresión (0 a 1)
        );
      };

      img.onerror = (error) => reject(error);
    };

    reader.onerror = (error) => reject(error);
  });
};

// Función para subir archivos a Firebase Storage
export const uploadFile = (file: File): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      // Convertir el archivo a WebP
      const webpBlob = await convertToWebP(file);

      // Crear un archivo WebP a partir del Blob
      const webpFile = new File([webpBlob], file.name.replace(/\.\w+$/, '.webp'), { type: 'image/webp' });

      // Crear una referencia a la ubicación en Storage
      const storageRef = ref(storage, `uploads/${webpFile.name}`);

      // Subir el archivo
      const uploadTask = uploadBytesResumable(storageRef, webpFile);

      // Escuchar los cambios de estado de la carga
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

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
    } catch (error) {
      reject(error);
    }
  });
};
