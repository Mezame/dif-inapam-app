import { FilterDocumentsByYearPipe } from './filter-documents-by-year.pipe';

describe('FilterDocumentsByYearPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterDocumentsByYearPipe();
    expect(pipe).toBeTruthy();
  });
});
