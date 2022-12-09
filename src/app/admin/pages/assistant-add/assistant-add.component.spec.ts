import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantAddComponent } from './assistant-add.component';

describe('AssistantAddComponent', () => {
  let component: AssistantAddComponent;
  let fixture: ComponentFixture<AssistantAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistantAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
