import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantListTableComponent } from './assistant-list-table.component';

describe('AssistantListTableComponent', () => {
  let component: AssistantListTableComponent;
  let fixture: ComponentFixture<AssistantListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistantListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
