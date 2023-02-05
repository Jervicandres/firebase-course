
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCgsHhGTgofZhBDfrFHuqKImmvX91ufxEU",
  authDomain: "fir-course-6d544.firebaseapp.com",
  projectId: "fir-course-6d544",
  storageBucket: "fir-course-6d544.appspot.com",
  messagingSenderId: "343726043621",
  appId: "1:343726043621:web:8086410345e28f6309ff0c",
  measurementId: "G-L2LQ05JTM4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
export const storage = getStorage(app)