export const initializeApp = () => ({ name: 'mock-app' });
export const getApps = () => [];
export const getApp = () => ({ name: 'mock-app' });
export const getAuth = () => ({ currentUser: null });
export class GoogleAuthProvider { }
export const signInWithPopup = async () => ({
  user: {
    email: 'student@hbplus.fit',
    displayName: 'HB+ Official Intern',
    uid: 'mock_uid_123',
  },
});
export const signOut = async () => true;
export const getFirestore = () => ({ name: 'mock-db' });
export const doc = (_db, collectionName, id) => ({ path: `${collectionName}/${id}` });
export const setDoc = async () => true;
export const getDoc = async () => ({
  exists: () => true,
  data: () => ({
    name: 'HB+ id',
    email: 'student@hbplus.fit',
    domain: 'hbplus.fit',
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
