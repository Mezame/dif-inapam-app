import { TestBed } from '@angular/core/testing';

import { ReportStoreService } from './report-store.service';

describe('ReportStoreService', () => {
  let service: ReportStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ReportStoreService, useValue: {} }],
    });
    service = TestBed.inject(ReportStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
