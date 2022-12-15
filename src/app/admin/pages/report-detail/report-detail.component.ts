import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Renderer2,
} from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { Report } from '@features/reports/report.interface';
import { Document } from '@features/documents/document.interface';
import { SortDocumentsService } from '@features/documents/services/sorts/sort-documents.service';
import { getReportById, getReports } from '@features/reports/get-reports';
import { documentsMock } from '@mocks/document.mock';
import { map, Observable, of, switchMap } from 'rxjs';
import { createDownloadUrl } from '../../shared/create-download-url';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDetailComponent implements OnInit {
  report$!: Observable<Report>;
  documents$?: Observable<Document[]>;
  objectUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private sortDocumentsService: SortDocumentsService,
    private renderer: Renderer2,
    private ref: ChangeDetectorRef
  ) {
    const id = this.route.snapshot.params['id'] as string;

    this.report$ = of(getReportById(id, getReports(of(documentsMock))));

    console.log();
  }

  ngOnInit(): void {
    const sortedDocuments$ =
      this.sortDocumentsService.sortDocumentsByCreateDate(
        of(documentsMock),
        'des'
      );

    this.documents$ = this.report$.pipe(
      switchMap((report) => {
        const reportYear = new Date(report.date).getFullYear();
        const reportMonth = new Date(report.date).getMonth();

        return sortedDocuments$.pipe(
          map((documents) => {
            return documents.filter((document) => {
              const documentYear = new Date(document.createDate).getFullYear();
              const documentMonth = new Date(document.createDate).getMonth();

              return documentYear == reportYear && documentMonth == reportMonth;
            });
          })
        );
      })
    );
  }

  onClick(el: MatAnchor, data: { report: Report; documents?: Document[] }) {
    createDownloadUrl(el, data, this.objectUrl, this.renderer, this.ref);
  }
}
