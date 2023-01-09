import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

import { DocumentAddEditFormComponent } from './document-add-edit-form.component';
import { DocumentAddEditFormModule } from './document-add-edit-form.module';

describe('DocumentAddEditFormComponent', () => {
  let component: DocumentAddEditFormComponent;
  let fixture: ComponentFixture<DocumentAddEditFormComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);

    await TestBed.configureTestingModule({
      imports: [DocumentAddEditFormModule, NoopAnimationsModule],
      declarations: [DocumentAddEditFormComponent],
      providers: [FormBuilder, { provide: ActivatedRoute, useValue: routeSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentAddEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
    const formField = await loader.getHarness(MatFormFieldHarness);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
