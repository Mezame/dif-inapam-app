import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { FireAuthService } from '@core/auth/fire-auth.service';
import { GetDocumentsService } from '@features/documents/services/firestore/get-documents.service';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { AlertsService } from '@shared/components/alert/services/alerts.service';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { ReportDetailComponent } from './report-detail.component';

fdescribe('ReportDetailComponent', () => {
  let component: ReportDetailComponent;
  let fixture: ComponentFixture<ReportDetailComponent>;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    const reportStoreServiceSpy = jasmine.createSpyObj('DocumentStoreService', [
      'getDocuments',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        SecondaryLayoutModule,
      ],
      declarations: [ReportDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: DocumentStoreService, useValue: reportStoreServiceSpy },
        { provide: GetDocumentsService, useValue: {} },
        { provide: AlertsService, useValue: {} },
        { provide: FireAuthService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
