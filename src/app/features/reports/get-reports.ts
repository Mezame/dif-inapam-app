import {
  getYears,
  getMonthsNumbers,
} from '@features/documents/utils/get-create-date';
import { documentsMock } from '@shared/mocks/document.mock';
import { Order } from '@shared/types/order.type';
import { of } from 'rxjs';
import { Report } from './report.interface';

export function getReports(): Report[] {
  let reports: Report[] = [];
  let counter = 0;

  const documentsYears = getYears(of(documentsMock));

  documentsYears.forEach((docYear) => {
    const documentsMonthsNumbers = getMonthsNumbers(of(documentsMock), docYear);

    documentsMonthsNumbers.forEach((docMonthNum) => {
      counter++;

      const defaultReport = {
        date: new Date(
          parseInt(docYear),
          parseInt(docMonthNum) - 1,
          15
        ).toLocaleString(),
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
          id: docYear + docMonthNum + counter.toString(),
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

export function getReportById(reports: Report[], id: string): Report {
  let report: Report;

  reports.forEach((r) => {
    if (r.metadata?.id == id) report = r;
  });

  return report!;
}

export function getLatestReport() {
  let latestReport: Report;

  latestReport = sortReportsByDate(getReports(), 'asc')[0];

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
