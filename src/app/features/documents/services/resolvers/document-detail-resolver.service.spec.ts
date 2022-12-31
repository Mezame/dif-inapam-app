import { TestBed } from '@angular/core/testing';

import { DocumentDetailResolverService } from './document-detail-resolver.service';

describe('DocumentDetailResolverService', () => {
  let service: DocumentDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
