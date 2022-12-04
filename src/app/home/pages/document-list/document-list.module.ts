import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DocumentListComponent } from './document-list.component';
import { PrimaryLayoutModule } from '../../layouts/primary/primary-layout.module';
import { DocumentListTableModule } from '@features/documents/document-list-table/document-list-table.module';
import { FilterDocumentsByMonthModule } from '@features/documents/pipes/filter-documents-by-month/filter-documents-by-month.module';

const routes: Routes = [{ path: '', component: DocumentListComponent }];

@NgModule({
  declarations: [DocumentListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimaryLayoutModule,
    DocumentListTableModule,
    FilterDocumentsByMonthModule,
  ],
  exports: [DocumentListComponent],
})
export class DocumentListModule {}
