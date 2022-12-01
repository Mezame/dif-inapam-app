import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListTemplate } from './document-list.template';

describe('DocumentListTemplate', () => {
  let component: DocumentListTemplate;
  let fixture: ComponentFixture<DocumentListTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentListTemplate ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentListTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
