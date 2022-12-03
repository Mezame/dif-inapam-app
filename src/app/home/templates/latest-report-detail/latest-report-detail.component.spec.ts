import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestReportDetailComponent } from './latest-report-detail.component';

describe('LatestReportDetailTemplate', () => {
  let component: LatestReportDetailComponent;
  let fixture: ComponentFixture<LatestReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestReportDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
