import * as functions from 'firebase-functions';
import { setReport, setReportBatch } from '../firestore/set-reports';
import {
  Document,
  getDocumentsMonths,
  getDocumentsYears,
} from '../utils/document-utils';
import { Report } from '../utils/report-utils';

export async function onWriteDocumentsSetReports(
  change: functions.Change<functions.firestore.DocumentSnapshot>,
  _context: functions.EventContext<{
    id: string;
  }>,
  documents: Document[]
) {
  try {
    if (!documents) {
      const document = change.after.exists
        ? (change.after.data() as Document)
        : null;

      if (document) {
        const documentCreateDate = new Date(document.createDate) as Date;
        const documentYear = documentCreateDate.getFullYear();
        const documentMonthNumber = documentCreateDate.getMonth();
        const date = new Date(documentYear, documentMonthNumber, 15);
        const id = `VER-TUXPAN-${date.toLocaleDateString('es-MX', {
          month: 'long',
        })}-${documentYear}`;

        const report = {
          date: date.toString(),
          cardsStats: {
            newRecord: 0,
            replacement: 0,
            change: 0,
            cancel: 0,
          },
          cardCodesRange: ['', ''],
          sexStats: { male: 0, female: 0 },
          metadata: {
            id: id,
          },
        };

        if (document.operationCode == 'NUEVO REG') {
          report.cardsStats.newRecord++;
        }

        if (document.operationCode == 'REPOSICION') {
          report.cardsStats.replacement++;
        }

        if (document.operationCode == 'CANJE') {
          report.cardsStats.change++;
        }

        report.cardCodesRange[0] = document.cardCode;

        if (document.sex == 'Hombre') {
          report.sexStats.male++;
        }

        if (document.sex == 'Mujer') {
          report.sexStats.female++;
        }

        await setReport(report);
      }
    } else {
      const reports: Report[] = [];
      let documentsMonthsNumbers: string[] = [];
      const documentsYears = getDocumentsYears(documents);

      documentsYears.forEach((docYear) => {
        const months = getDocumentsMonths(documents, docYear);

        documentsMonthsNumbers = [
          ...documentsMonthsNumbers,
          months.numbers as any,
        ];
      });

      documentsMonthsNumbers = [...new Set(documentsMonthsNumbers.flat())];

      documentsYears.forEach((docYear) => {
        documentsMonthsNumbers.forEach((docMonthNum) => {
          const date = new Date(
            parseInt(docYear),
            parseInt(docMonthNum) - 1,
            15
          );
          const id = `VER-TUXPAN-${date.toLocaleDateString('es-MX', {
            month: 'long',
          })}-${docYear}`;

          const defaultReport = {
            date: date.toString(),
            cardsStats: {
              newRecord: 0,
              replacement: 0,
              change: 0,
              cancel: 0,
            },
            cardCodesRange: ['', ''],
            sexStats: { male: 0, female: 0 },
            metadata: {
              id: id,
            },
          };

          reports[reports.length] = defaultReport;
        });
      });

      documents.sort(
        (a, b) => Date.parse(a.createDate) - Date.parse(b.createDate)
      );

      reports.forEach((report) => {
        const date = new Date(report.date);
        const reportMonth = date.getMonth();
        const reportYear = date.getFullYear();

        documents.forEach((document) => {
          const date = new Date(document.createDate);
          const documentMonth = date.getMonth();
          const documentYear = date.getFullYear();

          if (reportYear == documentYear && reportMonth == documentMonth) {
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
          }
        });
      });

      await setReportBatch(reports);
    }
  } catch (error) {
    functions.logger.error(error);

    return;
  }
}
