import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

import { FireAuthService } from '@core/auth/fire-auth.service';
import { DeleteAssistantsService } from '@features/assistants/services/firestore/delete-assistants.service';
import { AssistantStoreService } from '@features/assistants/services/store/assistant-store.service';
import { PrimaryLayoutModule } from '@shared/layouts/primary/primary-layout.module';
import { AssistantListComponent } from './assistant-list.component';

describe('AssistantListComponent', () => {
  let component: AssistantListComponent;
  let fixture: ComponentFixture<AssistantListComponent>;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
    const assistantStoreServiceSpy = jasmine.createSpyObj(
      'AssistantStoreService',
      ['getAssistants']
    );

    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, PrimaryLayoutModule],
      declarations: [AssistantListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: AssistantStoreService, useValue: assistantStoreServiceSpy },
        { provide: DeleteAssistantsService, useValue: {} },
        { provide: FireAuthService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssistantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
