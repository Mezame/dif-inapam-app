import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Document } from '@features/documents/document.interface';
import { SortDocumentsService } from '@features/documents/services/sorts/sort-documents.service';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { Report } from '@features/reports/report.interface';
import { AlertsService } from '@shared/components/alert/services/alerts.service';
import {
  CsvDataSource,
  parseDataSourceToCsv,
} from '@shared/utils/parse-data-source-to-csv';
import { map, Observable, switchMap } from 'rxjs';
import { createCsvDownloadUrl } from '../../shared/create-csv-download-url';
import {
  generateDocumentsReportDataSource,
  generateMonthlyReportDataSource,
} from '../../shared/reports-data-source';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDetailComponent implements OnInit {
  report$: Observable<Report>;
  documents$?: Observable<Document[]>;

  //reportId: string;
  objectUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private documentStoreService: DocumentStoreService,
    private sortDocumentsService: SortDocumentsService,
    private renderer: Renderer2,
    private cDRef: ChangeDetectorRef,
    private alertsService: AlertsService
  ) {
    //this.reportId = this.route.snapshot?.params['id'];

    this.report$ = this.route.data?.pipe(map((data) => data['report']));
  }

  ngOnInit(): void {
    const sortedDocuments$ =
      this.sortDocumentsService.sortDocumentsByCreateDate(
        this.documentStoreService.getDocuments(),
        'des'
      );

    if (this.report$ && sortedDocuments$) {
      this.documents$ = this.report$.pipe(
        switchMap((report) => {
          let reportYear: number;
          let reportMonth: number;

          reportYear = new Date(report.date).getFullYear();
          reportMonth = new Date(report.date).getMonth();

          return sortedDocuments$.pipe(
            map((documents) => {
              return documents.filter((document) => {
                let documentYear: number;
                let documentMonth: number;

                documentYear = new Date(document.createDate).getFullYear();
                documentMonth = new Date(document.createDate).getMonth();

                return (
                  documentYear == reportYear && documentMonth == reportMonth
                );
              });
            })
          );
        })
      );
    }
  }

  downloadMonthlyReportCsv(el: MatAnchor, data: { report: Report }) {
    let anchor: HTMLAnchorElement;
    let dataSource: CsvDataSource;
    let parsedCsvData: string;
    let reportLocaleMonth: string;
    let reportYear: string;
    let fileName: string;

    anchor = el._elementRef.nativeElement;

    if (anchor.href) return;

    dataSource = generateMonthlyReportDataSource(data);

    parsedCsvData = parseDataSourceToCsv(dataSource);

    this.objectUrl = createCsvDownloadUrl(parsedCsvData);

    this.renderer.setAttribute(anchor, 'href', this.objectUrl);

    reportLocaleMonth = new Date(data.report.date).toLocaleDateString('es-MX', {
      month: 'long',
    });
    reportYear = new Date(data.report.date).getFullYear().toString();
    fileName = `reporte-mensual-${reportLocaleMonth}-${reportYear}`;

    this.renderer.setAttribute(anchor, 'download', fileName!);

    anchor.click();

    this.renderer.setProperty(el, 'disabled', 'true');

    setTimeout(() => {
      this.alertsService.setAlert(
        `Se ha descargado el reporte mensual de ${reportLocaleMonth}, ${reportYear}`
      );
    }, 1500);

    setTimeout(() => {
      URL.revokeObjectURL(this.objectUrl as string);

      this.objectUrl = null;

      this.renderer.removeAttribute(anchor, 'href');

      this.renderer.removeAttribute(anchor, 'download');

      this.renderer.setProperty(el, 'disabled', 'false');

      this.cDRef.markForCheck();
    }, 4500);
  }

  downloadDocumentsReportCsv(el: MatAnchor, data: { documents: Document[] }) {
    let anchor: HTMLAnchorElement;
    let dataSource: CsvDataSource;
    let parsedCsvData: string;
    let reportLocaleMonth: string;
    let reportYear: string;
    let fileName: string;

    anchor = el._elementRef.nativeElement;

    if (anchor.href) return;

    dataSource = generateDocumentsReportDataSource(data);

    parsedCsvData = parseDataSourceToCsv(dataSource);

    this.objectUrl = createCsvDownloadUrl(parsedCsvData);

    this.renderer.setAttribute(anchor, 'href', this.objectUrl);

    reportLocaleMonth = new Date(
      data.documents[0].createDate
    ).toLocaleDateString('es-MX', { month: 'long' });
    reportYear = new Date(data.documents[0].createDate)
      .getFullYear()
      .toString();
    fileName = `reporte-oficios-${reportLocaleMonth}-${reportYear}`;

    this.renderer.setAttribute(anchor, 'download', fileName!);

    anchor.click();

    this.renderer.setProperty(el, 'disabled', 'true');

    setTimeout(() => {
      this.alertsService.setAlert(
        `Se ha descargado el reporte de oficios de ${reportLocaleMonth}, ${reportYear}`
      );
    }, 1500);

    setTimeout(() => {
      URL.revokeObjectURL(this.objectUrl as string);

      this.objectUrl = null;

      this.renderer.removeAttribute(anchor, 'href');

      this.renderer.removeAttribute(anchor, 'download');

      this.renderer.setProperty(el, 'disabled', 'false');

      this.cDRef.markForCheck();
    }, 4500);
  }
}
