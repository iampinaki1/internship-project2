import React, { createContext, useContext, useState } from 'react';
import { Platform } from 'react-native';
import { validateEmailDomain, RESTRICTED_DOMAIN_ERROR } from '../utils/domainValidation';
import { firestoreService } from '../services/firestoreService';
import { auth, googleAuthProvider } from '../config/firebase';
import { signInWithPopup, signOut as fbSignOut } from 'firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  /**
   * Google Sign-In with real Firebase Google OAuth & Domain Validation
   * @param {string} [manualEmail] - For manual/mobile input
   * @param {string} [manualName]
   */
  const loginWithGoogle = async (manualEmail, manualName) => {
    setLoading(true);
    setAuthError('');

    try {
      let email = manualEmail;
      let name = manualName || 'HB+ Intern';
      let uid = `uid_${Date.now()}`;

      // On Web: Trigger real Firebase Google OAuth Popup if no manual email passed
      if (Platform.OS === 'web' && !manualEmail) {
        try {
          const result = await signInWithPopup(auth, googleAuthProvider);
          if (result?.user) {
            email = result.user.email;
            name = result.user.displayName || name;
            uid = result.user.uid;
          }
        } catch (popupErr) {
          if (popupErr.code === 'auth/popup-closed-by-user') {
            throw new Error('Google sign-in was closed before completing.');
          }
          if (popupErr.code === 'auth/unauthorized-domain') {
            throw new Error('Authorized domain error. Add localhost/domain to Firebase Console OAuth.');
          }
          throw popupErr;
        }
      }

      if (!email) {
        throw new Error('No email provided.');
      }

      // Strict Domain Validation
      const validation = validateEmailDomain(email);

      if (!validation.isValid) {
        // Immediately revoke session if domain unauthorized
        if (Platform.OS === 'web') {
          try {
            await fbSignOut(auth);
          } catch (_) {}
        }
        const errorMsg = validation.error || RESTRICTED_DOMAIN_ERROR;
        setAuthError(errorMsg);
        throw new Error(errorMsg);
      }

      // Sync user profile to Firestore
      const userProfile = await firestoreService.syncUserProfile({
        uid,
        email: validation.email,
        name,
      });

      setUser(userProfile);
      return userProfile;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user and revoke session
   */
  const logout = async () => {
    setLoading(true);
    try {
      if (Platform.OS === 'web') {
        try {
          await fbSignOut(auth);
        } catch (_) {}
      }
      setUser(null);
      setAuthError('');
    } finally {
      setLoading(false);
    }
  };

  const clearAuthError = () => setAuthError('');

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
