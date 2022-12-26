import * as functions from 'firebase-functions';
import { Document } from '../../utils/document-utils';
import { defaultReport, Report } from '../../utils/report-utils';
import { getReport } from '../database/get-reports';
import { setReport } from '../database/set-reports';
import { updateReport } from '../database/update-reports';

export async function onCreateDocumentsSetReports(
  snapshot: functions.firestore.QueryDocumentSnapshot,
  _context: functions.EventContext<{
    id: string;
  }>,
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

    if (!report) {
      defaultReport.date = reportDate.toString();

      if (document.operationCode == 'NUEVO REG') {
        defaultReport.cardsStats.newRecord++;
      }

      if (document.operationCode == 'REPOSICION') {
        defaultReport.cardsStats.replacement++;
      }

      if (document.operationCode == 'CANJE') {
        defaultReport.cardsStats.change++;
      }

      defaultReport.cardCodesRange[0] = document.cardCode;

      defaultReport.cardCodesRange[1] = document.cardCode;

      if (document.sex == 'Hombre') {
        defaultReport.sexStats.male++;
      }

      if (document.sex == 'Mujer') {
        defaultReport.sexStats.female++;
      }

      defaultReport.metadata!.id = reportId;

      await setReport(defaultReport);
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

      if (report.cardCodesRange[0] == '') {
        report.cardCodesRange[0] = document.cardCode;
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
