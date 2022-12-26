import * as functions from 'firebase-functions';
import { firestore } from '../../init';
import { Report } from '../../utils/report-utils';

export async function getReport(id: string): Promise<Report | undefined> {
  try {
    const docRef = firestore.doc(`reports/${id}`);

    const docSnap = await docRef.get();

    const report = docSnap.data() as Report;

    if(report){
    functions.logger.info('get report successfully');
    } else {
      functions.logger.info('report does not exist');
    }

    return report;
  } catch (error) {
    functions.logger.info('could not update report', error);

    return;
  }
}
