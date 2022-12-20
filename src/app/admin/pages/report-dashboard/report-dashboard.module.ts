import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocumentListTableModule } from '@features/documents/document-list-table/document-list-table.module';
import { SortDocumentsByDatePipeModule } from '@features/documents/pipes/sort-documents-by-date/sort-documents-by-date.module';
import { SortDocumentsService } from '@features/documents/services/sorts/sort-documents.service';
import { ReportDetailContentModule } from '@features/reports/report-detail-content/report-detail-content.module';
import { PrimaryLayoutModule } from '@shared/layouts/primary/primary-layout.module';
import { ReportDashboardComponent } from './report-dashboard.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GetDocumentsService } from '@features/documents/services/firestore/get-documents.service';
import { DocumentStoreService } from '@features/documents/services/firestore/store/document-store.service';

const routes: Routes = [{ path: '', component: ReportDashboardComponent }];

@NgModule({
  declarations: [ReportDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimaryLayoutModule,
    ReportDetailContentModule,
    DocumentListTableModule,
    SortDocumentsByDatePipeModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [DocumentStoreService, GetDocumentsService, SortDocumentsService],
})
export class ReportDashboardModule {}
