import * as functions from 'firebase-functions';
import { firestore } from '../../init';

export async function setUser(id: string, user = {}) {
  try {
    const docRef = firestore.doc(`user/${id}`);

    const res = await docRef.set(user);

    if (res) {
      functions.logger.info('set user successfully');
    }

    return;
  } catch (error) {
    functions.logger.info('could not set user');

    return;
  }
}
