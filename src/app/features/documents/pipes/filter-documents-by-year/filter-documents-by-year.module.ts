import { NgModule } from '@angular/core';
import { FilterDocumentsService } from '@features/documents/services/filters/filter-documents.service';
import { FilterDocumentsByYearPipe } from './filter-documents-by-year.pipe';

@NgModule({
  declarations: [FilterDocumentsByYearPipe],
  exports: [FilterDocumentsByYearPipe],
  providers: [FilterDocumentsService],
})
export class FilterDocumentsByYearPipeModule {}
