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
import { map, Observable, switchMap } from 'rxjs';
import { createDownloadUrl } from '../../shared/create-download-url';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDetailComponent implements OnInit {
  reportId: string;
  report$: Observable<Report>;
  documents$?: Observable<Document[]>;
  objectUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private documentStoreService: DocumentStoreService,
    private sortDocumentsService: SortDocumentsService,
    private renderer: Renderer2,
    private cDRef: ChangeDetectorRef,
    private alertsService: AlertsService
  ) {
    this.reportId = this.route.snapshot.params['id'];

    this.report$ = this.route.data.pipe(map((data) => data['report']));
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
    createDownloadUrl(
      el,
      data,
      this.objectUrl,
      this.renderer,
      this.cDRef,
      this.alertsService
    );
  }
}
