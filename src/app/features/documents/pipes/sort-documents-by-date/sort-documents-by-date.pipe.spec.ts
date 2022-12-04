import { SortDocumentsByDatePipe } from './sort-documents-by-date.pipe';

describe('SortDocumentsByDatePipe', () => {
  it('create an instance', () => {
    const pipe = new SortDocumentsByDatePipe();
    expect(pipe).toBeTruthy();
  });
});
