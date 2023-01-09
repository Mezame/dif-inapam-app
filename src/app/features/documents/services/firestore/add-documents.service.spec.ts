import { TestBed } from '@angular/core/testing';

import { AddDocumentsService } from './add-documents.service';

describe('AddDocumentsService', () => {
  let service: AddDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AddDocumentsService, useValue: {} }],
    });
    service = TestBed.inject(AddDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
