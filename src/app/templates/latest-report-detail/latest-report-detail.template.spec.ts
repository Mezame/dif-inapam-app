import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestReportDetailTemplate } from './latest-report-detail.template';

describe('LatestReportDetailTemplate', () => {
  let component: LatestReportDetailTemplate;
  let fixture: ComponentFixture<LatestReportDetailTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestReportDetailTemplate ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestReportDetailTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
