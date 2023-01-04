import * as functions from 'firebase-functions';
import { firestore } from '../../init';

export async function deleteReport(id: string) {
  try {
    const docRef = firestore.doc(`reports/${id}`);

    const res = await docRef.delete();

    if (res) {
      functions.logger.info('deleted report successfully');
    }

    return;
  } catch (error) {
    functions.logger.info('could not delete report');

    return;
  }
}