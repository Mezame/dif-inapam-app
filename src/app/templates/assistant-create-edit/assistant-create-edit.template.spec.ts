import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantCreateEditTemplate } from './assistant-create-edit.template';

describe('AssistantCreateEditTemplate', () => {
  let component: AssistantCreateEditTemplate;
  let fixture: ComponentFixture<AssistantCreateEditTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantCreateEditTemplate ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistantCreateEditTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
