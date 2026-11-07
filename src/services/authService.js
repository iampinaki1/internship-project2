import { validateDomain } from '../utils/validateDomain';

/**
 * Authentication service handling login, domain verification, and logout
 */
export const authService = {
  /**
   * Handle Google sign-in response and validate organization domain
   * @param {Object} userCredential
   * @param {string} requiredDomain - Optional domain restriction
   */
  async handleGoogleSignIn(userCredential, requiredDomain = null) {
    const email = userCredential?.user?.email || userCredential?.email;
    if (requiredDomain && !validateDomain(email, requiredDomain)) {
      throw new Error(`Unauthorized domain. Only @${requiredDomain} accounts are allowed.`);
    }
    return userCredential;
  },

  async signOut() {
    // Implement sign out logic
    return true;
  },
};

export default authService;

