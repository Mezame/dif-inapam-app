import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DocumentListComponent } from './document-list.component';
import { PrimaryLayoutModule } from '../../layouts/primary/primary-layout.module';
import { DocumentListTableModule } from '@features/documents/document-list-table/document-list-table.module';
import { DocumentsByMonthPipeModule } from '@features/documents/pipes/documents-by-month/documents-by-month.module';
import { SortDocumentsByDateModule } from '@features/documents/pipes/sort-documents-by-date/sort-documents-by-date.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [{ path: '', component: DocumentListComponent }];

@NgModule({
  declarations: [DocumentListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimaryLayoutModule,
    DocumentListTableModule,
    DocumentsByMonthPipeModule,
    SortDocumentsByDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [DocumentListComponent],
})
export class DocumentListModule {}
