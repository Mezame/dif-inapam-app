import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCreateEditFormComponent } from './document-add-edit-form.component';

describe('DocumentCreateEditFormComponent', () => {
  let component: DocumentCreateEditFormComponent;
  let fixture: ComponentFixture<DocumentCreateEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentCreateEditFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentCreateEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
