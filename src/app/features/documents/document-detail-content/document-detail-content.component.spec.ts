import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDetailContentComponent } from './document-detail-content.component';

describe('DocumentDetailContentComponent', () => {
  let component: DocumentDetailContentComponent;
  let fixture: ComponentFixture<DocumentDetailContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentDetailContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
