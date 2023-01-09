import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDetailContentComponent } from './report-detail-content.component';

describe('ReportDetailContentComponent', () => {
  let component: ReportDetailContentComponent;
  let fixture: ComponentFixture<ReportDetailContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportDetailContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
