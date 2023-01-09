import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

import { FireAuthService } from '@core/auth/fire-auth.service';
import { DocumentAddEditFormModule } from '@features/documents/document-add-edit-form/document-add-edit-form.module';
import { AddDocumentsService } from '@features/documents/services/firestore/add-documents.service';
import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { AlertsService } from '@shared/components/alert/services/alerts.service';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { UploadFilesService } from '@shared/services/firestorage/upload-files.service';
import { DocumentAddComponent } from './document-add.component';

describe('DocumentAddComponent', () => {
  let component: DocumentAddComponent;
  let fixture: ComponentFixture<DocumentAddComponent>;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SecondaryLayoutModule,
        DocumentAddEditFormModule,
      ],
      declarations: [DocumentAddComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: AddDocumentsService, useValue: {} },
        { provide: DocumentStoreService, useValue: {} },
        { provide: UploadFilesService, useValue: {} },
        { provide: AlertsService, useValue: {} },
        { provide: FireAuthService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
