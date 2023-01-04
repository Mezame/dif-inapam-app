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
    const report = (await getReport(reportId)) as Report;
    const newReport = { ...defaultReport };

    if (!report) {
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
      if (document.operationCode == 'NUEVO REG') {
        report.cardsStats.newRecord++;
      }

      if (document.operationCode == 'REPOSICION') {
        report.cardsStats.replacement++;
      }

      if (document.operationCode == 'CANJE') {
        report.cardsStats.change++;
      }

      if (document.isCardCanceled) {
        report.cardsStats.cancel++;
      }

      report.cardCodesRange[1] = document.cardCode;

      if (document.sex == 'Hombre') {
        report.sexStats.male++;
      }

      if (document.sex == 'Mujer') {
        report.sexStats.female++;
      }

      await updateReport(report);
    }

    return;
  } catch (error) {
    functions.logger.error(error);

    return;
  }
}
