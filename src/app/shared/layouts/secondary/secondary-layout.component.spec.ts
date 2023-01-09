import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

import { FireAuthService } from '@core/auth/fire-auth.service';
import { SecondaryLayoutComponent } from './secondary-layout.component';
import { SecondaryLayoutModule } from './secondary-layout.module';

describe('SecondaryLayout', () => {
  let component: SecondaryLayoutComponent;
  let fixture: ComponentFixture<SecondaryLayoutComponent>;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);

    await TestBed.configureTestingModule({
      imports: [SecondaryLayoutModule, NoopAnimationsModule],
      declarations: [SecondaryLayoutComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: FireAuthService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SecondaryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
