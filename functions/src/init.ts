import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const app = initializeApp();

export const firestore = getFirestore(app);
export const auth = getAuth(app);