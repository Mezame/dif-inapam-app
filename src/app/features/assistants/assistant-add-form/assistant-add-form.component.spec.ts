import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantAddFormComponent } from './assistant-add-form.component';

describe('AssistantAddFormComponent', () => {
  let component: AssistantAddFormComponent;
  let fixture: ComponentFixture<AssistantAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantAddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistantAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
