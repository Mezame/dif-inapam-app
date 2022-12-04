import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDocumentsByMonthPipe } from './filter-documents-by-month.pipe';

@NgModule({
  declarations: [FilterDocumentsByMonthPipe],
  exports: [FilterDocumentsByMonthPipe],
})
export class FilterDocumentsByMonthModule {}
