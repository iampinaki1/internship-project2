import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Firebase Configuration for HB+ Intern Portal
 * Reads from environment variables with safe defaults
 */
const firebaseConfig = {
  apiKey: typeof process !== 'undefined' && process.env?.FIREBASE_API_KEY
    ? process.env.FIREBASE_API_KEY
    : 'AIzaSyDemoHBPlusInternKey123456789',
  authDomain: typeof process !== 'undefined' && process.env?.FIREBASE_AUTH_DOMAIN
    ? process.env.FIREBASE_AUTH_DOMAIN
    : 'hbplus-intern-portal.firebaseapp.com',
  projectId: typeof process !== 'undefined' && process.env?.FIREBASE_PROJECT_ID
    ? process.env.FIREBASE_PROJECT_ID
    : 'hbplus-intern-portal',
  storageBucket: typeof process !== 'undefined' && process.env?.FIREBASE_STORAGE_BUCKET
    ? process.env.FIREBASE_STORAGE_BUCKET
    : 'hbplus-intern-portal.appspot.com',
  messagingSenderId: typeof process !== 'undefined' && process.env?.FIREBASE_MESSAGING_SENDER_ID
    ? process.env.FIREBASE_MESSAGING_SENDER_ID
    : '109876543210',
  appId: typeof process !== 'undefined' && process.env?.FIREBASE_APP_ID
    ? process.env.FIREBASE_APP_ID
    : '1:109876543210:web:abcdef9876543210',
};

// Initialize Firebase App Singleton
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Firebase Auth & Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();

export default app;

