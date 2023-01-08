import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

import { FireAuthService } from '@core/auth/fire-auth.service';
import { AssistantAddFormModule } from '@features/assistants/assistant-add-form/assistant-add-form.module';
import { AddAssistantsService } from '@features/assistants/services/firestore/add-assistants.service';
import { AssistantStoreService } from '@features/assistants/services/store/assistant-store.service';
import { SecondaryLayoutModule } from '@shared/layouts/secondary/secondary-layout.module';
import { AssistantAddComponent } from './assistant-add.component';

fdescribe('AssistantAddComponent', () => {
  let component: AssistantAddComponent;
  let fixture: ComponentFixture<AssistantAddComponent>;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        SecondaryLayoutModule,
        AssistantAddFormModule,
      ],
      declarations: [AssistantAddComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: AddAssistantsService, useValue: {} },
        { provide: AssistantStoreService, useValue: {} },
        { provide: FireAuthService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssistantAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
