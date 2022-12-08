import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAddComponent } from './document-add.component';

describe('DocumentAddEditComponent', () => {
  let component: DocumentAddComponent;
  let fixture: ComponentFixture<DocumentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
