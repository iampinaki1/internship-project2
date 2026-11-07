import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Live Firebase Configuration for HB+ Intern Portal (Project: hbintern)
 */
const firebaseConfig = {
  apiKey: 'AIzaSyDRVRCGahmbsaf6KPvL4Xs3kNA-TdScQ6A',
  authDomain: 'hbintern.firebaseapp.com',
  projectId: 'hbintern',
  storageBucket: 'hbintern.firebasestorage.app',
  messagingSenderId: '1038543105258',
  appId: '1:1038543105258:web:38ba330eedf8be0556bb93',
};

// Initialize Firebase App Singleton
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firebase Auth & Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();

export default app;
