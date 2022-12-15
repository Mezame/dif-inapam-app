import { SortDocumentsService } from '@features/documents/services/sorts/sort-documents.service';
import { SortDocumentsByDatePipe } from './sort-documents-by-date.pipe';

xdescribe('SortDocumentsByDatePipe', () => {
  it('create an instance', () => {
    const pipe = new SortDocumentsByDatePipe(new SortDocumentsService);
    expect(pipe).toBeTruthy();
  });
});
