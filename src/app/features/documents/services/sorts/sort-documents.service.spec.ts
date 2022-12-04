import { TestBed } from '@angular/core/testing';

import { SortDocumentsService } from './sort-documents.service';

describe('SortDocumentsService', () => {
  let service: SortDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
