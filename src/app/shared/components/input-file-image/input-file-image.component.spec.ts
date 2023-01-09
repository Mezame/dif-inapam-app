import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFileImageComponent } from './input-file-image.component';
import { MatIconModule } from '@angular/material/icon';

describe('InputFileImageComponent', () => {
  let component: InputFileImageComponent;
  let fixture: ComponentFixture<InputFileImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [InputFileImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputFileImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
