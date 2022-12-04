import { TestBed } from '@angular/core/testing';

import { FilterDocumentsService } from './filter-documents.service';

describe('FilterDocumentsService', () => {
  let service: FilterDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
