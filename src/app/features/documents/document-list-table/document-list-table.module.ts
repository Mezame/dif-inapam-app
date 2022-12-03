import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentListTableComponent } from './document-list-table.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DocumentListTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [DocumentListTableComponent],
})
export class DocumentListTableModule {}
