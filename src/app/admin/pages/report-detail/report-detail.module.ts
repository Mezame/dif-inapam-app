import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SortDocumentsService } from '@features/documents/services/sorts/sort-documents.service';
import { ReportDetailContentModule } from '@features/reports/report-detail-content/report-detail-content.module';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { ReportDetailComponent } from './report-detail.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GetDocumentsService } from '@features/documents/services/firestore/get-documents.service';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { GetReportsService } from '@features/reports/services/firestore/get-reports.service';
import { ReportStoreService } from '@features/reports/services/firestore/report-store.service';

const routes: Routes = [{ path: '', component: ReportDetailComponent }];

@NgModule({
  declarations: [ReportDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SecondaryLayoutModule,
    ReportDetailContentModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    DocumentStoreService,
    GetDocumentsService,
    SortDocumentsService,
    ReportStoreService,
    GetReportsService,
  ],
})
export class ReportDetailModule {}
