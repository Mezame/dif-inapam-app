import { TestBed } from '@angular/core/testing';

import { AssistantStoreService } from './assistant-store.service';

describe('AssistantStoreService', () => {
  let service: AssistantStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistantStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
