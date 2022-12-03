import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentListTableComponent } from './document-list-table.component';

describe('DocumentListTableComponent', () => {
  let component: DocumentListTableComponent;
  let fixture: ComponentFixture<DocumentListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
