import { FilterDocumentsService } from '@features/documents/services/filters/filter-documents.service';
import { FilterDocumentsByYearPipe } from './filter-documents-by-year.pipe';

describe('FilterDocumentsByYearPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterDocumentsByYearPipe(new FilterDocumentsService);
    expect(pipe).toBeTruthy();
  });
});
