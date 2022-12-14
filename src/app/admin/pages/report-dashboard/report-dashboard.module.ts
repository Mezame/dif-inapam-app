import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ReportDashboardComponent } from './report-dashboard.component';
import { PrimaryLayoutModule } from '@shared/layouts/primary/primary-layout.module';
import { ReportDetailContentModule } from '@features/reports/report-detail-content/report-detail-content.module';
import { DocumentListTableModule } from '@features/documents/document-list-table/document-list-table.module';
import { SortDocumentsService } from '@features/documents/services/sorts/sort-documents.service';
import { SortDocumentsByDatePipeModule } from '@features/documents/pipes/sort-documents-by-date/sort-documents-by-date.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  providers: [SortDocumentsService],
})
export class ReportDashboardModule {}
