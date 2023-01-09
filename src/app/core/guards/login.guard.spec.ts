import { TestBed } from '@angular/core/testing';

import { FireAuthService } from '@core/auth/fire-auth.service';
import { LoginGuard } from './login.guard';

describe('LoginGuard', () => {
  let guard: LoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: FireAuthService, useValue: {} }],
    });
    guard = TestBed.inject(LoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
