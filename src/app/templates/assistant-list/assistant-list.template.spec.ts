import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantListTemplate } from './assistant-list.template';

describe('AssistantListTemplate', () => {
  let component: AssistantListTemplate;
  let fixture: ComponentFixture<AssistantListTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantListTemplate ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistantListTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
