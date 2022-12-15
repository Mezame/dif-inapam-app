import { FilterDocumentsService } from '@features/documents/services/filters/filter-documents.service';
import { FilterDocumentsByMonthPipe } from './filter-documents-by-month.pipe';

describe('FilterDocumentsByMonthPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterDocumentsByMonthPipe(new FilterDocumentsService);
    expect(pipe).toBeTruthy();
  });
});
