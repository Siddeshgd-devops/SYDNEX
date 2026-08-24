import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhmqvLT3QOuHnnqGK9x2nbpLkLEVOTyO4",
  authDomain: "sydnex-53e67.firebaseapp.com",
  projectId: "sydnex-53e67",
  storageBucket: "sydnex-53e67.firebasestorage.app",
  messagingSenderId: "485787427919",
  appId: "1:485787427919:web:de17b7854c40fcee03f63a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});