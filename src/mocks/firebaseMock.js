export const initializeApp = () => ({ name: 'mock-app' });
export const getApps = () => [];
export const getApp = () => ({ name: 'mock-app' });
export const getAuth = () => ({ currentUser: null });
export class GoogleAuthProvider {}
export const getFirestore = () => ({ name: 'mock-db' });
export const doc = (_db, collectionName, id) => ({ path: `${collectionName}/${id}` });
export const setDoc = async () => true;
export const getDoc = async () => ({
  exists: () => true,
  data: () => ({
    name: 'HB+ Official Intern',
    email: 'example@hbplus.fit',
    domain: 'hbplus.fit',
    role: 'Software Engineer Intern',
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
  getFirestore,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
};

