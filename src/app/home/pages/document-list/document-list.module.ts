import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DocumentListComponent } from './document-list.component';
import { PrimaryLayoutModule } from '../../../shared/layouts/primary/primary-layout.module';
import { DocumentListTableModule } from '@features/documents/document-list-table/document-list-table.module';
import { FilterDocumentsByMonthPipeModule } from '@features/documents/pipes/filter-documents-by-month/filter-documents-by-month.module';
import { FilterDocumentsByYearPipeModule } from '@features/documents/pipes/filter-documents-by-year/filter-documents-by-year.module';
import { SortDocumentsByDatePipeModule } from '@features/documents/pipes/sort-documents-by-date/sort-documents-by-date.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { GetDocumentsService } from '@features/documents/services/firestore/get-documents.service';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';

const routes: Routes = [{ path: '', component: DocumentListComponent }];

@NgModule({
  declarations: [DocumentListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimaryLayoutModule,
    DocumentListTableModule,
    FilterDocumentsByMonthPipeModule,
    FilterDocumentsByYearPipeModule,
    SortDocumentsByDatePipeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [GetDocumentsService, DocumentStoreService]
})
export class DocumentListModule {}
