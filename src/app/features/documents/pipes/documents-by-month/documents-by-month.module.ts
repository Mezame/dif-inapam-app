import { NgModule } from '@angular/core';
import { FilterDocumentsService } from '@features/documents/services/filters/filter-documents.service';
import { DocumentsByMonthPipe } from './documents-by-month.pipe';

@NgModule({
  declarations: [DocumentsByMonthPipe],
  exports: [DocumentsByMonthPipe],
  providers: [FilterDocumentsService]
})
export class DocumentsByMonthPipeModule {}
