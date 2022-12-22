import { TestBed } from '@angular/core/testing';

import { SortReportsService } from './sort-reports.service';

describe('SortReportsService', () => {
  let service: SortReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
