import { TestBed } from '@angular/core/testing';

import { ReportStoreService } from '../store/report-store.service';
import { ReportDetailResolverService } from './report-detail-resolver.service';

describe('ReportDetailResolverService', () => {
  let service: ReportDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ReportStoreService, useValue: {} }],
    });
    service = TestBed.inject(ReportDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
