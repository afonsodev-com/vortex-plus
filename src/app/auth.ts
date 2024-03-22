import { initializeApp } from "firebase/app";
import { getAuth, signOut, initializeAuth, getReactNativePersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
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

const db = getFirestore(); // Inicialize o Firestore

export async function loginUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Recupere os detalhes do usuário do Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userDetails = userDoc.data();

    // Armazene os detalhes do usuário no AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(userDetails));

    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function registerUser(email: string, password: string, username: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Crie um novo documento no Firestore para o usuário
    const userDetails = { username, email };
    await setDoc(doc(db, 'users', user.uid), userDetails);

    // Armazene os detalhes do usuário no AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(userDetails));

    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
}