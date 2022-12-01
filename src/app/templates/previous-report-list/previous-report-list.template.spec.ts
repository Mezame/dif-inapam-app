import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousReportListTemplate } from './previous-report-list.template';

describe('PreviousReportListTemplate', () => {
  let component: PreviousReportListTemplate;
  let fixture: ComponentFixture<PreviousReportListTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousReportListTemplate ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousReportListTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
