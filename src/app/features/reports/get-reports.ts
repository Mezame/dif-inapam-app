import {
  getYears,
  getMonthsNumbers,
} from '@features/documents/utils/get-create-date';
import { documentsMock } from '@mocks/document.mock';
import { Order } from '@shared/types/order.type';
import { last, Observable, of, tap } from 'rxjs';
import { Report } from './report.interface';
import { Document } from '@features/documents/document.interface';

export function getReports(documents$: Observable<Document[]>): Report[] {
  let reports: Report[] = [];
  let documents: Document[] = [];

  const documentsYears = getYears(documents$);

  documentsYears.forEach((docYear) => {
    const documentsMonthsNumbers = getMonthsNumbers(documents$, docYear);

    documentsMonthsNumbers.forEach((docMonthNum) => {
      const date = new Date(parseInt(docYear), parseInt(docMonthNum) - 1, 15);
      const id = `VER-TUXPAN-${date.toLocaleDateString('es-MX', {
        month: 'long',
      })}-${docYear}`;

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
              defaultReport.cardsStats.change
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

  documents$
    .pipe(
      tap((d) => {
        documents = d;
      })
    )
    .subscribe();

  documents.sort((a, b) => Date.parse(a.createDate) - Date.parse(b.createDate));

  reports.forEach((report) => {
    const date = new Date(report.date);
    const reportMonth = date.getMonth();
    const reportYear = date.getFullYear();

    documents.forEach((document) => {
      const date = new Date(document.createDate);
      const documentMonth = date.getMonth();
      const documentYear = date.getFullYear();

      if (reportYear == documentYear && reportMonth == documentMonth) {
        if (document.operationCode == 'NUEVO REG')
          report.cardsStats.newRecord++;

        if (document.operationCode == 'REPOSICION')
          report.cardsStats.replacement++;

        if (document.operationCode == 'CANJE') report.cardsStats.change++;

        if (document.isCardCanceled) report.cardsStats.cancel++;

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

  latestReport = sortReportsByDate(getReports(of(documentsMock)), 'asc')[0];

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
