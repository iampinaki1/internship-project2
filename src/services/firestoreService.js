import { db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

/**
 * Firestore Service for storing and retrieving Intern user profiles
 */
export const firestoreService = {
  /**
   * Save or update an authorized intern profile in Firestore
   * Collection: 'users'
   * Document ID: user.email (normalized lowercase)
   */
  async syncUserProfile(user) {
    if (!user?.email) return null;

    const emailKey = user.email.trim().toLowerCase();
    const profile = {
      uid: user.uid || `hb_${Date.now()}`,
      name: user.name || 'HB+ Intern',
      email: emailKey,
      domain: 'hbplus.fit',
      role: 'Software Engineer Intern',
      department: 'Healthcare & Benefits Engineering',
      status: 'Active',
      lastLogin: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      firestoreSynced: true,
    };

    try {
      const userDocRef = doc(db, 'users', emailKey);
      await setDoc(userDocRef, profile, { merge: true });
      return { ...profile, storageType: 'Firestore (Cloud)' };
    } catch (error) {
      console.warn('Firestore cloud sync fallback (offline/local cache mode):', error.message);
      // Graceful fallback: return profile with local sync flag
      return { ...profile, storageType: 'Firestore (Cached / Local Sync)' };
    }
  },

  /**
   * Fetch an intern user profile from Firestore by email
   */
  async getUserProfile(email) {
    if (!email) return null;

    try {
      const emailKey = email.trim().toLowerCase();
      const userDocRef = doc(db, 'users', emailKey);
      const snapshot = await getDoc(userDocRef);

      if (snapshot.exists()) {
        return snapshot.data();
      }
    } catch (error) {
      console.warn('Firestore fetch fallback:', error.message);
    }
    return null;
  },
};

export default firestoreService;

