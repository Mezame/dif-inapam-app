import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDetailTemplate } from './document-detail.template';

describe('DocumentDetailTemplate', () => {
  let component: DocumentDetailTemplate;
  let fixture: ComponentFixture<DocumentDetailTemplate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentDetailTemplate ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentDetailTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
