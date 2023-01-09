import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { FireAuthService } from '@core/auth/fire-auth.service';
import { UpdateDocumentsService } from '@features/documents/services/firestore/update-documents.service';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { AlertsService } from '@shared/components/alert/services/alerts.service';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { DeleteFilesService } from '@shared/services/firestorage/delete-files.service';
import { UploadFilesService } from '@shared/services/firestorage/upload-files.service';
import { DocumentEditComponent } from './document-edit.component';

describe('DocumentEditComponent', () => {
  let component: DocumentEditComponent;
  let fixture: ComponentFixture<DocumentEditComponent>;

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
      declarations: [DocumentEditComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: DocumentStoreService, useValue: documentStoreServiceSpy },
        { provide: UpdateDocumentsService, useValue: {} },
        { provide: UploadFilesService, useValue: {} },
        { provide: DeleteFilesService, useValue: {} },
        { provide: AlertsService, useValue: {} },
        { provide: FireAuthService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
