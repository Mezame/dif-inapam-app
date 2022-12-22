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
import { map, Observable, switchMap } from 'rxjs';
import { createDownloadUrl } from '../../shared/create-download-url';

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
    private cDRef: ChangeDetectorRef
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

  onClick(el: MatAnchor, data: { report: Report; documents?: Document[] }) {
    createDownloadUrl(el, data, this.objectUrl, this.renderer, this.cDRef);
  }
}
