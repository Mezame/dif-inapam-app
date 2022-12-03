import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEditTemplate } from './document-edit.template';

describe('DocumentEditTemplate', () => {
  let component: DocumentEditTemplate;
  let fixture: ComponentFixture<DocumentEditTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentEditTemplate ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentEditTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
