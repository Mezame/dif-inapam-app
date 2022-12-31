import { TestBed } from '@angular/core/testing';

import { ReportDetailResolverService } from './report-detail-resolver.service';

describe('ReportDetailResolverService', () => {
  let service: ReportDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
