import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantCreateEditComponent } from './assistant-create-edit.component';

describe('AssistantCreateEditComponent', () => {
  let component: AssistantCreateEditComponent;
  let fixture: ComponentFixture<AssistantCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistantCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
