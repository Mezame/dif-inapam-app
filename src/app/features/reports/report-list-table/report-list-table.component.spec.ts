import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListTableComponent } from './report-list-table.component';

describe('ReportListTableComponent', () => {
  let component: ReportListTableComponent;
  let fixture: ComponentFixture<ReportListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
