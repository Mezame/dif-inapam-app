import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  collection,
  serverTimestamp,
} from '@angular/fire/firestore';
import {
  documentsMock,
  getDocumentsMonths,
  getDocumentsYears,
} from '@mocks/document.mock';
import { Report } from '@features/reports/report.interface';
import { Document } from '@features/documents/document.interface';
import { assistantsMock } from '@mocks/assistant.mock';
import { AlertsService } from '@shared/components/alert/services/alerts.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent implements OnInit {
  constructor(
    private firestore: Firestore,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    //this.getDocuments();
  }

  openAlert() {
    const id = 'P000000561';
    this.alertsService.setAlert(`Se añadió el oficio con folio ${id}`);
  }

  uploadDocuments() {
    documentsMock.forEach((document) => {
      const docRef = doc(this.firestore, 'documents', document.cardCode);

      setDoc(docRef, {
        ...document,
        createDate: new Date(document.createDate).toString(),
        metadada: {
          timestamp: serverTimestamp(),
        },
      });
    });
  }

  uploadDocumentUtils() {
    let dateStore = {};
    let documentsMonths = {};
    const documentsYears = getDocumentsYears();

    documentsYears.forEach((docYear) => {
      const months = getDocumentsMonths(undefined, docYear);

      documentsMonths = {
        ...documentsMonths,
        [docYear]: { numbers: months.numbers, words: months.words },
      };
    });

    dateStore = {
      months: documentsMonths,
      years: documentsYears,
    };

    const docRef = doc(this.firestore, 'documentUtils', 'dateStore');

    setDoc(docRef, dateStore);
  }

  uploadReports() {
    let reports: Report[] = [];
    let documentsMonthsNumbers: string[] = [];
    const documents: Document[] = documentsMock;
    const documentsYears = getDocumentsYears();

    documentsYears.forEach((docYear) => {
      const months = getDocumentsMonths(undefined, docYear);
      documentsMonthsNumbers = [
        ...documentsMonthsNumbers,
        months.numbers as any,
      ];
    });

    documentsMonthsNumbers = [...new Set(documentsMonthsNumbers.flat())];

    documentsYears.forEach((docYear) => {
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

    reports.forEach((report) => {
      const id = report.metadata?.id;

      const docRef = doc(this.firestore, 'reports', id!);

      setDoc(docRef, report);
    });
  }

  uploadAssistants() {
    assistantsMock.forEach((assistant) => {
      const assistantsRef = collection(this.firestore, 'assistants');
      const docRef = doc(assistantsRef);

      setDoc(docRef, {
        ...assistant,
        metadata: {
          id: docRef.id,
          timestamp: serverTimestamp(),
        },
      });
    });
  }
}
