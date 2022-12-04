import { NgModule } from '@angular/core';
import { FilterDocumentsService } from '@features/documents/services/filter-documents.service';
import { FilterDocumentsByMonthPipe } from './filter-documents-by-month.pipe';

@NgModule({
  declarations: [FilterDocumentsByMonthPipe],
  exports: [FilterDocumentsByMonthPipe],
  providers: [FilterDocumentsService]
})
export class FilterDocumentsByMonthModule {}
