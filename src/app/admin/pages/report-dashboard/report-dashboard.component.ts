import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { Document } from '@features/documents/document.interface';
import { SortDocumentsService } from '@features/documents/services/sorts/sort-documents.service';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { Report } from '@features/reports/report.interface';
import { SortReportsService } from '@features/reports/services/sorts/sort-reports.service';
import { ReportStoreService } from '@features/reports/services/store/report-store.service';
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
  selector: 'app-report-dashboard',
  templateUrl: './report-dashboard.component.html',
  styleUrls: ['./report-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDashboardComponent implements OnInit {
  report$!: Observable<Report>;
  documents$?: Observable<Document[]>;

  objectUrl: string | null = null;

  constructor(
    private documentStoreService: DocumentStoreService,
    private sortDocumentsService: SortDocumentsService,
    private reportStoreService: ReportStoreService,
    private sortReportsService: SortReportsService,
    private renderer: Renderer2,
    private cDRef: ChangeDetectorRef,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    const sortedDocuments$ =
      this.sortDocumentsService.sortDocumentsByCreateDate(
        this.documentStoreService.getDocuments(),
        'des'
      );

    this.report$ = this.sortReportsService
      .sortReportsByDate(this.reportStoreService.getReports(), 'asc')
      .pipe(map((reports) => reports[0] ?? {}));

    if (this.report$ && sortedDocuments$) {
      this.documents$ = this.report$.pipe(
        switchMap((report) => {
          const reportYear = new Date(report.date).getFullYear();
          const reportMonth = new Date(report.date).getMonth();

          return sortedDocuments$.pipe(
            map((documents) => {
              return documents.filter((document) => {
                const documentYear = new Date(
                  document.createDate
                ).getFullYear();

                const documentMonth = new Date(document.createDate).getMonth();

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
    const anchor = el._elementRef.nativeElement as HTMLAnchorElement;

    if (anchor.href) return;

    const dataSource = generateMonthlyReportDataSource(data) as CsvDataSource;

    const parsedCsvData = parseDataSourceToCsv(dataSource) as string;

    this.objectUrl = createCsvDownloadUrl(parsedCsvData) as string;

    this.renderer.setAttribute(anchor, 'href', this.objectUrl);

    const reportLocaleMonth = new Date(data.report.date).toLocaleDateString(
      'es-MX',
      { month: 'long' }
    );
    const reportYear = new Date(data.report.date).getFullYear().toString();
    const fileName = `reporte-mensual-${reportLocaleMonth}-${reportYear}`;

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
    const anchor = el._elementRef.nativeElement as HTMLAnchorElement;

    if (anchor.href) return;

    const dataSource = generateDocumentsReportDataSource(data) as CsvDataSource;

    const parsedCsvData = parseDataSourceToCsv(dataSource) as string;

    this.objectUrl = createCsvDownloadUrl(parsedCsvData) as string;

    this.renderer.setAttribute(anchor, 'href', this.objectUrl);

    const reportLocaleMonth = new Date(
      data.documents[0].createDate
    ).toLocaleDateString('es-MX', { month: 'long' });
    const reportYear = new Date(data.documents[0].createDate)
      .getFullYear()
      .toString();
    const fileName = `reporte-oficios-${reportLocaleMonth}-${reportYear}`;

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
