import { NgModule } from '@angular/core';
import { SortDocumentsService } from '@features/documents/services/sorts/sort-documents.service';
import { SortDocumentsByDatePipe } from './sort-documents-by-date.pipe';

@NgModule({
  declarations: [SortDocumentsByDatePipe],
  exports: [SortDocumentsByDatePipe],
  providers: [SortDocumentsService],
})
export class SortDocumentsByDatePipeModule {}
