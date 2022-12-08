import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAddEditFormComponent } from './document-add-edit-form.component';

describe('DocumentAddEditFormComponent', () => {
  let component: DocumentAddEditFormComponent;
  let fixture: ComponentFixture<DocumentAddEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentAddEditFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
