import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

import { FireAuthService } from '@core/auth/fire-auth.service';
import { PrimaryLayoutComponent } from './primary-layout.component';
import { PrimaryLayoutModule } from './primary-layout.module';

describe('PrimaryLayout', () => {
  let component: PrimaryLayoutComponent;
  let fixture: ComponentFixture<PrimaryLayoutComponent>;

  beforeEach(async () => {
    const routeSpy = jasmine.createSpyObj('ActivatedRoute', ['']);

    await TestBed.configureTestingModule({
      imports: [PrimaryLayoutModule, NoopAnimationsModule],
      declarations: [PrimaryLayoutComponent],
      providers: [
        { provide: ActivatedRoute, useValue: routeSpy },
        { provide: FireAuthService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimaryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
