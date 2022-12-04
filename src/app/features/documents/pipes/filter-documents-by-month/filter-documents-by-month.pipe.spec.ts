import { FilterDocumentsByMonthPipe } from './filter-documents-by-month.pipe';

describe('FilterDocumentsByMonthPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterDocumentsByMonthPipe();
    expect(pipe).toBeTruthy();
  });
});
