import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { FireAuthService } from '@core/auth/fire-auth.service';
import { DeleteDocumentsService } from '@features/documents/services/firestore/delete-documents.service';
import { UpdateDocumentsService } from '@features/documents/services/firestore/update-documents.service';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { AlertsService } from '@shared/components/alert/services/alerts.service';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { DeleteFilesService } from '@shared/services/firestorage/delete-files.service';
import { DocumentDetailComponent } from './document-detail.component';

describe('DocumentDetailComponent', () => {
  let component: DocumentDetailComponent;
  let fixture: ComponentFixture<DocumentDetailComponent>;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    const documentStoreServiceSpy = jasmine.createSpyObj(
      'DocumentStoreService',
      ['getDocuments']
    );

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        SecondaryLayoutModule,
      ],
      declarations: [DocumentDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: DocumentStoreService, useValue: documentStoreServiceSpy },
        { provide: UpdateDocumentsService, useValue: {} },
        { provide: DeleteDocumentsService, useValue: {} },
        { provide: DeleteFilesService, useValue: {} },
        { provide: AlertsService, useValue: {} },
        { provide: FireAuthService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
