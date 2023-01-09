import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { FireAuthService } from '@core/auth/fire-auth.service';

import { DocumentStoreService } from '@features/documents/services/store/document-store.service';
import { PrimaryLayoutModule } from '@shared/layouts/primary/primary-layout.module';
import { DocumentListComponent } from './document-list.component';

describe('DocumentList', () => {
  let component: DocumentListComponent;
  let fixture: ComponentFixture<DocumentListComponent>;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    const documentStoreServiceSpy = jasmine.createSpyObj(
      'DocumentStoreService',
      ['getDocumentUtilsDateStore', 'getDocuments']
    );

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, PrimaryLayoutModule],
      declarations: [DocumentListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: DocumentStoreService, useValue: documentStoreServiceSpy },
        { provide: FireAuthService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
