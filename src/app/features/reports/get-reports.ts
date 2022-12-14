import {
  getYears,
  getMonthsNumbers,
} from '@features/documents/utils/get-create-date';
import { documentsMock } from '@shared/mocks/document.mock';
import { Order } from '@shared/types/order.type';
import { Observable, of } from 'rxjs';
import { Report } from './report.interface';
import { Document } from '@features/documents/document.interface';

const reports = getReports(of(documentsMock));

export function getReports(documents: Observable<Document[]>): Report[] {
  let reports: Report[] = [];
  let counter = 0;

  const documentsYears = getYears(documents);

  documentsYears.forEach((docYear) => {
    const documentsMonthsNumbers = getMonthsNumbers(documents, docYear);

    documentsMonthsNumbers.forEach((docMonthNum) => {
      const date = new Date(parseInt(docYear), parseInt(docMonthNum) - 1, 15);
      const id = `${date.toLocaleDateString('es-MX', {
        month: 'short',
      })}-${docYear}`;
      counter++;

      const defaultReport = {
        date: date.toLocaleString(),
        cardsStats: {
          newRecord: 0,
          replacement: 0,
          change: 0,
          cancel: 0,
          getTotal: () => {
            return (
              defaultReport.cardsStats.newRecord +
              defaultReport.cardsStats.replacement +
              defaultReport.cardsStats.change +
              defaultReport.cardsStats.cancel
            );
          },
        },
        cardCodesRange: ['', ''],
        sexStats: { male: 0, female: 0 },
        metadata: {
          id: id,
        },
      };

      reports.push(defaultReport);
    });
  });

  reports.forEach((report) => {
    const date = new Date(report.date);
    const reportMonth = date.getMonth();
    const reportYear = date.getFullYear();

    documentsMock.forEach((document) => {
      const date = new Date(document.createDate);
      const documentMonth = date.getMonth();
      const documentYear = date.getFullYear();

      if (reportYear == documentYear && reportMonth == documentMonth) {
        if (document.operationCode == 'NUEVO REG')
          report.cardsStats.newRecord++;

        if (document.operationCode == 'REPOSICION')
          report.cardsStats.replacement++;

        if (document.operationCode == 'CANJE') report.cardsStats.change++;

        if (document.cancelCard) report.cardsStats.cancel++;

        if (report.cardCodesRange[0] == '')
          report.cardCodesRange[0] = document.cardCode;

        report.cardCodesRange[1] = document.cardCode;

        if (document.sex == 'Hombre') report.sexStats.male++;

        if (document.sex == 'Mujer') report.sexStats.female++;
      }
    });
  });

  return reports;
}

export function getReportById(id: string, reports: Report[]): Report {
  let report: Report;

  report = reports.find((r) => r.metadata!.id == id) as Report;

  return report!;
}

export function getLatestReport() {
  let latestReport: Report;

  latestReport = sortReportsByDate(reports, 'asc')[0];

  return latestReport;
}

export function sortReportsByDate(
  reports: Report[],
  order: Order = 'asc'
): Report[] {
  let orderedReports: Report[];
  let orderFn: (a: Report, b: Report) => number;

  if (order == 'asc') {
    orderFn = (a, b) => {
      return Date.parse(b.date) - Date.parse(a.date);
    };
  }

  if (order == 'des') {
    orderFn = (a, b) => {
      return Date.parse(a.date) - Date.parse(b.date);
    };
  }

  orderedReports = reports.sort(orderFn!);

  return orderedReports;
}
