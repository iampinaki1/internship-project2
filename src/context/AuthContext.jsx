import React, { createContext, useContext, useState, useEffect } from 'react';
import { validateEmailDomain, RESTRICTED_DOMAIN_ERROR } from '../utils/domainValidation';
import { firestoreService } from '../services/firestoreService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  /**
   * Google Sign-In with strict Domain Validation
   * @param {string} email - Email provided by Google OAuth / user
   * @param {string} [name] - User display name
   */
  const loginWithGoogle = async (email, name = 'HB+ Intern') => {
    setLoading(true);
    setAuthError('');

    try {
      // 1. Validate email domain strictly (@hbplus.fit)
      const validation = validateEmailDomain(email);

      if (!validation.isValid) {
        const errorMsg = validation.error || RESTRICTED_DOMAIN_ERROR;
        setAuthError(errorMsg);
        throw new Error(errorMsg);
      }

      // 2. Sync / Save user profile to Firestore
      const userProfile = await firestoreService.syncUserProfile({
        email: validation.email,
        name: name || (validation.email.includes('example') ? 'HB+ Intern' : validation.email.split('@')[0]),
        uid: `uid_${Date.now()}`,
      });

      // 3. Authenticate user
      setUser(userProfile);
      return userProfile;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user and revoke protected route access
   */
  const logout = async () => {
    setLoading(true);
    try {
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
