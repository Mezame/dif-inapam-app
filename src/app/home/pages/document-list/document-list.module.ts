import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DocumentListComponent } from './document-list.component';
import { PrimaryLayoutModule } from '../../layouts/primary/primary-layout.module';
import { DocumentListTableModule } from '@features/documents/document-list-table/document-list-table.module';
import { FilterDocumentsByMonthModule } from '@features/documents/pipes/filter-documents-by-month/filter-documents-by-month.module';
import { SortDocumentsByDateModule } from '@features/documents/pipes/sort-documents-by-date/sort-documents-by-date.module';

const routes: Routes = [{ path: '', component: DocumentListComponent }];

@NgModule({
  declarations: [DocumentListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimaryLayoutModule,
    DocumentListTableModule,
    FilterDocumentsByMonthModule,
    SortDocumentsByDateModule
  ],
  exports: [DocumentListComponent],
})
export class DocumentListModule {}
