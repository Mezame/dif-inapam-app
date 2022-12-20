import { TestBed } from '@angular/core/testing';

import { UpdateDocumentsService } from './update-documents.service';

describe('UpdateDocumentsService', () => {
  let service: UpdateDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
