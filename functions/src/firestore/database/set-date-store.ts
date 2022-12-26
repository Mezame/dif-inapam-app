import * as functions from 'firebase-functions';
import { firestore } from '../../init';
import { DateStore } from '../../utils/document-utils';

export async function setDateStore(dateStore: DateStore) {
  try {
    const docRef = firestore.doc('documentUtils/dateStore');

    await docRef.set(dateStore);

    functions.logger.info('set dateStore successfully');

    return;
  } catch (error) {
    functions.logger.info('could not set dateStore');

    return;
  }
}
