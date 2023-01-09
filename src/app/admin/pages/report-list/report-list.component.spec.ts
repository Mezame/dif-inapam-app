import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

import { FireAuthService } from '@core/auth/fire-auth.service';
import { GetReportsService } from '@features/reports/services/firestore/get-reports.service';
import { ReportStoreService } from '@features/reports/services/store/report-store.service';
import { PrimaryLayoutModule } from '@shared/layouts/primary/primary-layout.module';
import { ReportListComponent } from './report-list.component';

describe('ReportListComponent', () => {
  let component: ReportListComponent;
  let fixture: ComponentFixture<ReportListComponent>;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    const reportStoreServiceSpy = jasmine.createSpyObj('ReportStoreService', [
      'getReports',
    ]);

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, PrimaryLayoutModule],
      declarations: [ReportListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: ReportStoreService, useValue: reportStoreServiceSpy },
        { provide: GetReportsService, useValue: {} },
        { provide: FireAuthService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
