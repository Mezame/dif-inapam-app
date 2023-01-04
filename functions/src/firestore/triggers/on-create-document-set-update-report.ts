import * as functions from 'firebase-functions';
import { Document } from '../../utils/document-utils';
import { defaultReport, Report } from '../../utils/report-utils';
import { getReport } from '../database/get-reports';
import { setReport } from '../database/set-reports';
import { updateReport } from '../database/update-reports';

export async function onCreateDocumentSetUpdateReport(
  snapshot: functions.firestore.QueryDocumentSnapshot,
  _context: functions.EventContext<{
    id: string;
  }>
) {
  try {
    const document = snapshot.data() as Document;
    const documentCreateDate = new Date(document.createDate) as Date;
    const documentYear = documentCreateDate.getFullYear();
    const documentMonthNumber = documentCreateDate.getMonth();
    const reportDate = new Date(documentYear, documentMonthNumber, 15);
    const reportId = `VER-TUXPAN-${reportDate.toLocaleDateString('es-MX', {
      month: 'long',
    })}-${documentYear}`;

    const report = (await getReport(reportId)) as Readonly<Report>;

    if (!report) {
      const newReport = { ...defaultReport };

      newReport.date = reportDate.toString();

      if (document.operationCode == 'NUEVO REG') {
        newReport.cardsStats.newRecord++;
      }

      if (document.operationCode == 'REPOSICION') {
        newReport.cardsStats.replacement++;
      }

      if (document.operationCode == 'CANJE') {
        newReport.cardsStats.change++;
      }

      newReport.cardCodesRange[0] = document.cardCode;

      newReport.cardCodesRange[1] = document.cardCode;

      if (document.sex == 'Hombre') {
        newReport.sexStats.male++;
      }

      if (document.sex == 'Mujer') {
        newReport.sexStats.female++;
      }

      newReport.metadata!.id = reportId;

      await setReport(newReport);
    } else {
      const updatedReport = { ...report };

      if (document.operationCode == 'NUEVO REG') {
        updatedReport.cardsStats.newRecord++;
      }

      if (document.operationCode == 'REPOSICION') {
        updatedReport.cardsStats.replacement++;
      }

      if (document.operationCode == 'CANJE') {
        updatedReport.cardsStats.change++;
      }

      if (document.isCardCanceled) {
        updatedReport.cardsStats.cancel++;
      }

      updatedReport.cardCodesRange[1] = document.cardCode;

      if (document.sex == 'Hombre') {
        updatedReport.sexStats.male++;
      }

      if (document.sex == 'Mujer') {
        updatedReport.sexStats.female++;
      }

      await updateReport(updatedReport);
    }

    return;
  } catch (error) {
    functions.logger.error(error);

    return;
  }
}
