import { TestBed } from '@angular/core/testing';

import { DeleteDocumentsService } from './delete-documents.service';

describe('DeleteDocumentsService', () => {
  let service: DeleteDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DeleteDocumentsService, useValue: {} }],
    });
    service = TestBed.inject(DeleteDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
