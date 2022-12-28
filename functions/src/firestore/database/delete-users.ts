import * as functions from 'firebase-functions';
import { firestore } from '../../init';

export async function deleteUser(id: string) {
  try {
    const docRef = firestore.doc(`user/${id}`);

    const res = await docRef.delete();

    if (res) {
      functions.logger.info('deleted user successfully');
    }

    return;
  } catch (error) {
    functions.logger.info('could not delete user');

    return;
  }
}