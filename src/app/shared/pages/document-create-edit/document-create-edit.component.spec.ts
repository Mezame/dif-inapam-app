import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCreateEditComponent } from './document-create-edit.component';

describe('DocumentEditComponent', () => {
  let component: DocumentCreateEditComponent;
  let fixture: ComponentFixture<DocumentCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
