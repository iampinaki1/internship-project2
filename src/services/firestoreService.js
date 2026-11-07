import { Platform } from 'react-native';
import { db } from '../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

/**
 * Firestore Service
 *
 * Uses the Firebase JS Web SDK on both platforms.
 * On mobile, Firestore writes are wrapped in a 5-second timeout so a slow
 * or unavailable network never freezes the auth flow.
 */

function buildProfile(user) {
  const emailKey = user.email.trim().toLowerCase();
  const isAdmin  = emailKey.startsWith('admin') || emailKey.startsWith('lead');
  return {
    uid:        user.uid || `hb_${Date.now()}`,
    name:       user.name || (isAdmin ? 'HB+ Administrator' : 'HB+ Intern'),
    email:      emailKey,
    domain:     'gmail.com',
    role:       isAdmin ? 'Admin' : 'User',
    department: 'Healthcare & Benefits Engineering',
    status:     'Active',
    lastLogin:  new Date().toISOString(),
    updatedAt:  new Date().toISOString(),
  };
}

async function writeWithTimeout(profile, timeoutMs = 5000) {
  const write = async () => {
    await setDoc(doc(db, 'users', profile.email), profile, { merge: true });
    return { ...profile, firestoreSynced: true, storageType: 'Firestore (Cloud)' };
  };
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Firestore timeout')), timeoutMs)
  );
  return Promise.race([write(), timeout]);
}

export const firestoreService = {
  async syncUserProfile(user) {
    if (!user?.email) return null;
    const profile = buildProfile(user);
    try {
      return await writeWithTimeout(profile);
    } catch (err) {
      console.warn('Firestore sync skipped:', err.message);
      // Return a local profile so auth flow completes even without network
      return { ...profile, firestoreSynced: false, storageType: 'Local' };
    }
  },

  async getUserProfile(email) {
    if (!email) return null;
    try {
      const snap = await getDoc(doc(db, 'users', email.trim().toLowerCase()));
      return snap.exists() ? snap.data() : null;
    } catch (err) {
      console.warn('Firestore fetch error:', err.message);
      return null;
    }
  },
};

export default firestoreService;
