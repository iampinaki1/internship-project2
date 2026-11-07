/**
 * Jest test double for Firebase modular SDK
 * Used strictly for offline unit testing in Jest
 */
export const initializeApp = () => ({ name: 'test-app' });
export const getApps = () => [];
export const getApp = () => ({ name: 'test-app' });
export const getAuth = () => ({ currentUser: null });
export class GoogleAuthProvider {}
export const signInWithPopup = async () => ({
  user: {
    email: 'test@hbplus.fit',
    displayName: 'Test User',
    uid: 'test_uid_123',
  },
});
export const signOut = async () => true;
export const getFirestore = () => ({ name: 'test-db' });
export const doc = (_db, collectionName, id) => ({ path: `${collectionName}/${id}` });
export const setDoc = async () => true;
export const getDoc = async () => ({
  exists: () => true,
  data: () => ({
    name: 'Test User',
    email: 'test@hbplus.fit',
    domain: 'hbplus.fit',
    role: 'User',
    status: 'Active',
  }),
});
export const serverTimestamp = () => new Date().toISOString();

export default {
  initializeApp,
  getApps,
  getApp,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
};

