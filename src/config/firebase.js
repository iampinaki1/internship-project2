import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Firebase Configuration for HB+ Intern Portal (Project: hbintern)
 *
 * These values are safe to keep here for a web Firebase project — the API key
 * is a public identifier, not a secret. Access is controlled by Firebase
 * Security Rules and the OAuth authorized-domains allowlist.
 *
 * For the web build, Vite replaces any import.meta.env.VITE_* references at
 * build time.  Metro (Android/iOS) does NOT support import.meta, so we keep
 * the literal values here and rely on Firebase Security Rules for protection.
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
