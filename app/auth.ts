import { initializeApp } from "firebase/app";
import { getAuth, signOut, initializeAuth, getReactNativePersistence, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDPeAiXpaNmtMa1cisK4gXqvdlRvEKphzs",
  authDomain: "vortex-plus-b06f7.firebaseapp.com",
  projectId: "vortex-plus-b06f7",
  storageBucket: "vortex-plus-b06f7.appspot.com",
  messagingSenderId: "690193069668",
  appId: "1:690193069668:web:8fb20f9651df91628d1171",
  measurementId: "G-5ENQQLXGXG"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error(error);
  }
}
