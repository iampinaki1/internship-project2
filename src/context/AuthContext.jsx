import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { validateEmailDomain, RESTRICTED_DOMAIN_ERROR } from '../utils/domainValidation';
import { firestoreService } from '../services/firestoreService';
import { auth, googleAuthProvider } from '../config/firebase';
import {
  signInWithPopup,
  signOut as webSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const WEB_CLIENT_ID =
  '1038543105258-82st52143oi1c85pbvudf6qhokq2vmd0.apps.googleusercontent.com';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser]           = useState(null);
  const [authError, setAuthError] = useState('');
  // initializing stays true until we know whether a session exists.
  // On web: resolved by onAuthStateChanged.
  // On mobile: resolved immediately (no native SDK persistence).
  const [initializing, setInitializing] = useState(Platform.OS === 'web');

  // ─── Session Persistence (web only) ──────────────────────────────────────
  useEffect(() => {
    if (Platform.OS !== 'web') return; // mobile has no persistent session via web SDK

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const validation = validateEmailDomain(firebaseUser.email);
        if (validation.isValid) {
          const profile = await firestoreService.syncUserProfile({
            uid:   firebaseUser.uid,
            email: firebaseUser.email,
            name:  firebaseUser.displayName || 'HB+ Intern',
          });
          setUser(profile);
        } else {
          try { await webSignOut(auth); } catch (_) {}
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  // ─── Google Sign-In ───────────────────────────────────────────────────────
  const loginWithGoogle = async () => {
    setAuthError('');

    let email, name, uid;

    if (Platform.OS === 'web') {
      // Web: real Firebase OAuth popup
      try {
        const result = await signInWithPopup(auth, googleAuthProvider);
        email = result.user.email;
        name  = result.user.displayName || 'HB+ Intern';
        uid   = result.user.uid;
      } catch (err) {
        if (err.code === 'auth/popup-closed-by-user') {
          throw new Error('Sign-in popup was closed. Please try again.');
        }
        if (err.code === 'auth/unauthorized-domain') {
          throw new Error(
            'This domain is not authorised. Add it in Firebase Console → Authentication → Authorized domains.'
          );
        }
        throw err;
      }
    } else {
      // Mobile: @react-native-google-signin picks a Google account and
      // returns an idToken. We verify it against Firebase Auth.
      // Requires google-services.json with correct SHA-1 fingerprint.
      try {
        GoogleSignin.configure({ webClientId: WEB_CLIENT_ID });
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const signInResult = await GoogleSignin.signIn();

        // SDK v13+ wraps result in { data: { idToken, user } }
        const idToken  = signInResult?.data?.idToken  ?? signInResult?.idToken;
        const userInfo = signInResult?.data?.user      ?? signInResult?.user;

        if (!idToken) throw new Error('Google Sign-In failed: no ID token.');

        // Use the Firebase JS Web SDK to exchange the idToken for a session.
        // signInWithCredential works in React Native with the web SDK.
        const credential     = GoogleAuthProvider.credential(idToken);
        const firebaseResult = await signInWithCredential(auth, credential);

        email = firebaseResult.user.email;
        name  = firebaseResult.user.displayName || userInfo?.name || 'HB+ Intern';
        uid   = firebaseResult.user.uid;
      } catch (err) {
        if (err.code === 'SIGN_IN_CANCELLED' || err.code === '-5') {
          throw new Error('Sign-in was cancelled.');
        }
        throw err;
      }
    }

    // Domain validation
    const validation = validateEmailDomain(email);
    if (!validation.isValid) {
      try { await webSignOut(auth); } catch (_) {}
      const msg = validation.error || RESTRICTED_DOMAIN_ERROR;
      setAuthError(msg);
      throw new Error(msg);
    }

    // Sync profile
    const userProfile = await firestoreService.syncUserProfile({
      uid, email: validation.email, name,
    });
    setUser(userProfile);
    return userProfile;
  };

  // ─── Logout ───────────────────────────────────────────────────────────────
  const logout = async () => {
    try { await webSignOut(auth); } catch (_) {}
    if (Platform.OS !== 'web') {
      try { await GoogleSignin.revokeAccess(); } catch (_) {}
      try { await GoogleSignin.signOut(); }     catch (_) {}
    }
    setUser(null);
    setAuthError('');
  };

  const clearAuthError = () => setAuthError('');

  return (
    <AuthContext.Provider
      value={{
        user,
        initializing,
        authError,
        isAuthenticated: Boolean(user),
        loginWithGoogle,
        logout,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthContext;
