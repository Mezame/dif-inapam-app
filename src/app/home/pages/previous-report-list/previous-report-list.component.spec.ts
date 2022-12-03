import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousReportListComponent} from './previous-report-list.component';

describe('PreviousReportListTemplate', () => {
  let component: PreviousReportListComponent;
  let fixture: ComponentFixture<PreviousReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousReportListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
