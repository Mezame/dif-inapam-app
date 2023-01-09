import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FireAuthService } from '@core/auth/fire-auth.service';
import { AlertsService } from '@shared/components/alert/services/alerts.service';
import { CustomLoginComponent } from './custom-login.component';
import { CustomLoginModule } from './custom-login.module';

describe('CustomLoginComponent', () => {
  let component: CustomLoginComponent;
  let fixture: ComponentFixture<CustomLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, CustomLoginModule],
      declarations: [CustomLoginComponent],
      providers: [
        FormBuilder,
        { provide: AlertsService, useValue: {} },
        { provide: FireAuthService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
