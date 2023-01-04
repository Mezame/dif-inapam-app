import * as functions from 'firebase-functions';
import { Document } from '../../utils/document-utils';
import { Report } from '../../utils/report-utils';
import { getReport } from '../database/get-reports';
import { updateReport } from '../database/update-reports';

export async function onUpdateDocumentUpdateReport(
  change: functions.Change<functions.firestore.QueryDocumentSnapshot>,
  _context: functions.EventContext<{
    id: string;
  }>
) {
  try {
    const oldDocument = change.before.data() as Document;
    const document = change.after.data() as Document;
    const documentCreateDate = new Date(document.createDate) as Date;
    const documentYear = documentCreateDate.getFullYear();
    const documentMonthNumber = documentCreateDate.getMonth();
    const reportDate = new Date(documentYear, documentMonthNumber, 15);
    const reportId = `VER-TUXPAN-${reportDate.toLocaleDateString('es-MX', {
      month: 'long',
    })}-${documentYear}`;

    const report = (await getReport(reportId)) as Readonly<Report>;

    if (!report) {
      return;
    }

    const updatedReport = { ...report };

    if (document.operationCode != oldDocument.operationCode) {
      if (document.operationCode == 'NUEVO REG') {
        updatedReport.cardsStats.newRecord++;
      }

      if (document.operationCode == 'REPOSICION') {
        updatedReport.cardsStats.replacement++;
      }

      if (document.operationCode == 'CANJE') {
        updatedReport.cardsStats.change++;
      }

      if (oldDocument.operationCode == 'NUEVO REG') {
        updatedReport.cardsStats.newRecord--;
      }

      if (oldDocument.operationCode == 'REPOSICION') {
        updatedReport.cardsStats.replacement--;
      }

      if (oldDocument.operationCode == 'CANJE') {
        updatedReport.cardsStats.change--;
      }
    }

    if (document.isCardCanceled) {
      updatedReport.cardsStats.cancel++;
    }

    if (document.sex != oldDocument.sex) {
      if (document.sex == 'Hombre') {
        updatedReport.sexStats.male++;
        updatedReport.sexStats.female--;
      }

      if (document.sex == 'Mujer') {
        updatedReport.sexStats.female++;
        updatedReport.sexStats.male--;
      }
    }

    await updateReport(updatedReport);

    return;
  } catch (error) {
    functions.logger.error(error);

    return;
  }
}
