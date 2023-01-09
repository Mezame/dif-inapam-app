import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

import { AssistantAddFormComponent } from './assistant-add-form.component';
import { AssistantAddFormModule } from './assistant-add-form.module';

describe('AssistantAddFormComponent', () => {
  let component: AssistantAddFormComponent;
  let fixture: ComponentFixture<AssistantAddFormComponent>;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);

    await TestBed.configureTestingModule({
      imports: [AssistantAddFormModule, NoopAnimationsModule],
      declarations: [AssistantAddFormComponent],
      providers: [FormBuilder, { provide: ActivatedRoute, useValue: routeSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AssistantAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
