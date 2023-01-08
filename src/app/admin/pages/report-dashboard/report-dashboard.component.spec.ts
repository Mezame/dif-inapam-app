import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

import { FireAuthService } from '@core/auth/fire-auth.service';
import { GetDocumentsService } from '@features/documents/services/firestore/get-documents.service';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { GetReportsService } from '@features/reports/services/firestore/get-reports.service';
import { ReportStoreService } from '@features/reports/services/store/report-store.service';
import { AlertsService } from '@shared/components/alert/services/alerts.service';
import { PrimaryLayoutModule } from '@shared/layouts/primary/primary-layout.module';
import { ReportDashboardComponent } from './report-dashboard.component';

fdescribe('ReportDashboardComponent', () => {
  let component: ReportDashboardComponent;
  let fixture: ComponentFixture<ReportDashboardComponent>;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    const documentStoreServiceSpy = jasmine.createSpyObj(
      'DocumentStoreService',
      ['getDocuments']
    );
    const reportStoreServiceSpy = jasmine.createSpyObj('ReportStoreService', [
      'getReports',
    ]);

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, PrimaryLayoutModule],
      declarations: [ReportDashboardComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: DocumentStoreService, useValue: documentStoreServiceSpy },
        { provide: GetDocumentsService, useValue: {} },
        { provide: ReportStoreService, useValue: reportStoreServiceSpy },
        { provide: GetReportsService, useValue: {} },
        { provide: AlertsService, useValue: {} },
        { provide: FireAuthService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
