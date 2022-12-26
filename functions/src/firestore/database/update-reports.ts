import * as functions from 'firebase-functions';
import { firestore } from '../../init';
import { Report } from '../../utils/report-utils';

export async function updateReport(report: Report) {
  try {
    const id = report.metadata?.id;
    const docRef = firestore.doc(`reports/${id}`);

    const res = await docRef.update({...report});

    if (res) {
      functions.logger.info('update report successfully');
    }

    return;
  } catch (error) {
    functions.logger.info('could not set report', error);

    return;
  }
}
