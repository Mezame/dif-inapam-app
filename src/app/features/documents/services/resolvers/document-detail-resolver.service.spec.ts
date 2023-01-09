import { TestBed } from '@angular/core/testing';

import { DocumentStoreService } from '../store/document-store.service';
import { DocumentDetailResolverService } from './document-detail-resolver.service';

describe('DocumentDetailResolverService', () => {
  let service: DocumentDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DocumentStoreService, useValue: {} }],
    });
    service = TestBed.inject(DocumentDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
