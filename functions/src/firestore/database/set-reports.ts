import * as functions from 'firebase-functions';
import { firestore } from '../../init';
import { Report } from '../../utils/report-utils';

export async function setReport(report: Report) {
  try {
    const id = report.metadata?.id;
    const docRef = firestore.doc(`reports/${id}`);

    const res = await docRef.set(report);

    if (res) {
      functions.logger.info('set report successfully');
    }

    return;
  } catch (error) {
    functions.logger.info('could not set report');

    return;
  }
}

export async function setReportBatch(reports: Report[]) {
  try {
    const writeBatch = firestore.batch();

    reports.forEach((report) => {
      const id = report.metadata?.id;

      writeBatch.set(firestore.doc(`reports/${id}`), report);
    });

    await writeBatch.commit();

    functions.logger.info('set reports successfully');

    return;
  } catch (error) {
    functions.logger.info('could not set reports');

    return;
  }
}
